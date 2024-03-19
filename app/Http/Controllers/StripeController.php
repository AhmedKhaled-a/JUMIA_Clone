<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StripeController extends Controller
{
    function checkout()
    {
        $orders = '{
            "total_items": 3,
            "productsCount": {
                "1": 2,
                "2": 1
            },
            "cart_items": [
                {
                    "id": 1,
                    "count": 2,
                    "product": {
                        "id": 1,
                        "created_at": "2024-03-16T14:56:03.000000Z",
                        "updated_at": "2024-03-16T15:01:02.000000Z",
                        "title": "Samsung S10 4777 update 2",
                        "desc": "Test Desc For Sasmung S10",
                        "spec": "test spec s10",
                        "price": 5000,
                        "discount": 2,
                        "brand": "samsung",
                        "stock": 25,
                        "rating": 3,
                        "thumbnail": "assets/uploads/product/CfCEz1PFJQlZ56JifUHC.png",
                        "category_id": 2,
                        "seller_id": 1
                    }
                },
                {
                    "id": 2,
                    "count": 1,
                    "product": {
                        "id": 2,
                        "created_at": "2024-03-16T14:56:55.000000Z",
                        "updated_at": "2024-03-16T15:01:08.000000Z",
                        "title": "Samsung S10 4777 update 2",
                        "desc": "Test Desc For Sasmung S10",
                        "spec": "test spec s10",
                        "price": 5000,
                        "discount": 2,
                        "brand": "samsung",
                        "stock": 25,
                        "rating": 3,
                        "thumbnail": "assets/uploads/product/npxKCcuiORbAFprnG58W.png",
                        "category_id": 2,
                        "seller_id": 1
                    }
                }
            ]
        }';

        $data = json_decode($orders, true);

        $CartProducts = $data['cart_items'];

        $stripe = new \Stripe\StripeClient(env('STRIPE_SECRET_KEY'));

        $line_items = [];
        $total_price = 0;

        foreach ($CartProducts as $CartProduct) {
            $product = $CartProduct['product'];
            $total_price += $product['price'] * $CartProduct['count'];

            $line_items[] = [
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => [
                        'name' => $product['title'] ,
                        // 'images' => [$CartProduct->image],
                    ],
                    'unit_amount' => $product['price']  * 100,
                ],
                'quantity' => $CartProduct['count'],
            ];
        }

        $checkout_session = $stripe->checkout->sessions->create([
            'line_items' => $line_items,
            'mode' => 'payment',
            // 'success_url' => route('payment.checkout', [], false),
            // 'cancel_url' => route('payment.cancel', [], false),
            'success_url' => 'http://localhost:8000/success',
            'cancel_url' => 'http://localhost:8000/cancel',
        ]);

        return redirect($checkout_session->url);
    }
}
