<?php
/* Custom error codes */
/*
{
    user_id : 1,
    cart:[
        {product_id : 1, count:100, shipping_cost: 22 (calculated at front end), shipping_period: 2 (in days calculated in FE)},
        {product_id : 5, count:140},
    ]
}
*/

namespace App\Http\Controllers;


use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use App\Errors;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    public function index() {

        $orders = Order::orderBy('created_at' , 'desc')->get();
        return response()->json([ "orders" => $orders ], 200);

    }
    public function store(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        if (empty($data)) {
            return response()->json(['message' => 'Empty request']);
        }

        $validator = Validator::make($data['cart'], [
            'count' => 'required|integer',
            'product_id' => 'required|exists:App\Models\Product,id',
            'shipping_cost' => "required",
            'shipping_period' => "required"
        ]);

        if($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        foreach ($data['cart'] as $cartItem) {
            // dd($cartItem['product_id']);
            $product = Product::find($cartItem['product_id']);
            if (!$product) {
                return response()->json(['code' => Errors::ERR_OUT_OF_STOCK ,'message' => 'product not found']);
            }
            if($product->stock < $cartItem['count']) {
                return response()->json(['code' => Errors::ERR_OUT_OF_STOCK ,'message' => 'Out of stock']);
            }

            $seller = $product->seller;

            $order = Order::create([
                'count' => $cartItem['count'],
                'price' => $product->price,
                'shipping_period' => $cartItem['shipping_period'],
                'shipping_cost' => $cartItem['shipping_cost'],
                'order_status' => 'processing' // when created by default
            ]);
            $product->stock -= $cartItem['count'];
            $product->save();
            $order->product()->associate($product);
            $order->user()->associate(User::find($data['user_id']));
            $order->seller()->associate($seller);

            $order->save();

        }

        return response()->json(['code' => Errors::ERR_NO_ERR, 'message' => 'order saved successfully']);
    }

    public function getForUser(string $userId)
    {
        $orders = Order::where('user_id' , $userId)->get();
        // dd($orders);
        return response()->json($orders);
    }

    public function getForSeller(string $sellerId)
    {
        $orders = Order::where('seller_id' , $sellerId)->with(['product'])->get();
        // dd($orders);
        return response()->json($orders);
    }

    /*
        Accepts json :
            {
                order_status: 'processing', 'shipped' or 'delivered'
            }
    */
    public function changeOrderStatus(Request $request, string $orderId)
    {
        $order = Order::find($orderId);
        $data = json_decode($request->getContent(), true);
        // dd($orders);
        $order->order_status = $data['order_status'];
        $order->save();
        return response()->json(['code' => Errors::ERR_NO_ERR, 'message' => 'order updated successfully']);
    }

    public function deleteOrder(string $orderId) {
        $order = Order::find($orderId);
        if(!$order) {
            return response()->json(['code' => Errors::ERR_ORDER_NOT_FOUND ,'message' => 'order not found']);
        }
        $product = $order->product;
        $product->stock += $order->count;
        $product->save();
        $order->delete();
        return response()->json(['code' => Errors::ERR_NO_ERR, 'message' => 'order deleted successfully']);

    }

    public function getOrdersForUserByStatus(string $userId, string $status) {
        $orders = Order::where('user_id', $userId)->where('order_status', $status)->get();

        if ($orders->isEmpty()) {
            return response()->json(['code' => Errors::ERR_ORDER_NOT_FOUND ,'message' => 'No orders found with the provided status']);
        }

        $products = $orders->map(function ($order) {
            return $order->product;
        });

        return response()->json($products, JsonResponse::HTTP_OK);
    }

}
