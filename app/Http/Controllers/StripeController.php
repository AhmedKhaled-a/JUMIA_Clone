<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StripeController extends Controller
{
    function checkout(Request $request)
    {
        $userId = $request->input('userId');
        // dd($userId);

        $orders = $request->input('cart');
    
        $CartProducts = $orders['cart_items'];

        $stripe = new \Stripe\StripeClient(env('STRIPE_SECRET_KEY'));

        $line_items = [];
        $total_price = 0;

        foreach ( $CartProducts as $CartProduct ) {
            $product = $CartProduct['product'];
            $total_price += ($product['price'] - ($product['price'] * $product['discount'] / 100)) * $CartProduct['count'];

            $line_items[] = [
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => [
                        'name' => $product['title'] ,
                        // 'images' => [$CartProduct->image],
                    ],
                    'unit_amount' => ceil(($product['price'] - ($product['price'] * $product['discount'] / 100)) * 100),
                ],
                'quantity' => $CartProduct['count'],
            ];
        }

        $checkout_session = $stripe->checkout->sessions->create([
            'line_items' => $line_items,
            'mode' => 'payment',
            'success_url' => 'http://localhost:3000/payment/success?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => 'http://localhost:3000/cancel',
        ]);

        foreach ($CartProducts as $cartItem) {
            $order = new Order();
            $order->user_id = $userId; // TODO: get user id from auth
            $order->count = $cartItem['count'];
            $order->price = $cartItem['product']['price'] * $cartItem['count'];
            $order->order_status = 'processing';
            $order->shipping_period = 2;
            $order->shipping_cost = 50;
            $order->seller_id = $cartItem['product']['seller_id'];
            $order->product_id = $cartItem['product']['id'];

            $prodcutInstance = Product::find($cartItem['product']['id']);
            $prodcutInstance->stock -= $order->count;
            $prodcutInstance->save();

            $order->payment_status = 'unpaid';
            $order->session_id = $checkout_session->id;
            $order->save();

            // delete cartiem here
            // $cartItem->delete();      
        }

        

        return response()->json(['redirectUrl' => $checkout_session->url]);
    }

    function success(Request $request)
    {
        $stripe = new \Stripe\StripeClient(env('STRIPE_SECRET_KEY'));
        // $session_id = $request->query('session_id');
        $session = $stripe->checkout->sessions->retrieve($_GET['session_id']);
        // dd($session);
        // $session_id = $_GET['session_id'];
        // $session = $stripe->checkout->sessions->retrieve($session_id);
        // dd($session);
        try {
            if (!$session) {
                return response()->json(['message' => 'Session not found'], JsonResponse::HTTP_NOT_FOUND);
            }

            $orders = Order::where('session_id', $session->id)->get();

            if ($orders->isEmpty()) {
                return response()->json(['message' => 'No unpaid orders found for this session'], JsonResponse::HTTP_NOT_FOUND);
            }

            foreach ($orders as $order) {
                if ($order->payment_status === 'unpaid') {
                    $order->payment_status = 'paid';
                    $order->save();
                }
            }

            // Delete the user's cart items
            // $user = User::find(1); // TODO: get user id from auth
            // $user->carts()->delete();

            // $customer = $stripe->customers->retrieve($session->customer);
            return response()->json(['message' => 'Payment Successful'], JsonResponse::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], JsonResponse::HTTP_BAD_REQUEST);
        }
    }

    function cancel()
    {
        return response()->json("cancel");
    }

    public function webhook()
    {
        // This is your Stripe CLI webhook secret for testing your endpoint locally.
        $endpoint_secret = env('STRIPE_WEBHOOK_SECRET');

        $payload = @file_get_contents('php://input');
        $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
        $event = null;

        try {
            $event = \Stripe\Webhook::constructEvent(
                $payload, $sig_header, $endpoint_secret
            );
        } catch (\UnexpectedValueException $e) {
            // Invalid payload
            return response('', 400);
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            // Invalid signature
            return response('', 400);
        }

        // Handle the event
        switch ($event->type) {
            case 'checkout.session.completed':
                $session = $event->data->object;

                $orders = Order::where('session_id', $session->id)->get();

                if ($orders->isEmpty()) {
                    return response()->json(['message' => 'No unpaid orders found for this session'], JsonResponse::HTTP_NOT_FOUND);
                }

                foreach ($orders as $order) {
                    if ($order && $order->payment_status === 'unpaid') {
                        $order->payment_status = 'paid';
                        $order->save();
                        // Send email to customer
                    }
                }

            // ... handle other event types
            default:
                echo 'Received unknown event type ' . $event->type;
        }

        return response('');
    }
}
