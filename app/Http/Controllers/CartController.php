<?php

namespace App\Http\Controllers;

use App\Errors;
use Illuminate\Http\Request;
use App\Models\Cart;
use App\Http\Resources\CartResource;
use App\Models\Product;
use Illuminate\Support\Facades\Validator;

class CartController extends Controller
{
    public function addItem(Request $request, string $user_id)
    {
        $data = json_decode($request->getContent(), true);
        if (empty($data)) {
            return response()->json(["code" => Errors::ERR_EMPTY_REQ, 'message' => 'Empty request'], 404);
        }

        $validator = Validator::make($data, [
            'product_id' => 'required|integer',
            'count' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $cart = new Cart();
        $cart->user_id = $user_id;
        $product = Product::find($data['product_id']);

        $cart->product()->associate($product);
        $cart->count = 1;
        $cart->save();

        return response()->json([
            'cart' => $cart,
            'product' => $product,
            'message' => 'Item added to cart successfully'
        ]);
    }

    public function getCartTotal(string $userId) {
        $cartItems = Cart::where('user_id', $userId)->with(['product'])->get();
        $totalItems = $cartItems->sum('count');

        return response()->json(['totalItems' =>  $totalItems]);
    }

    public function getCart($userId)
    {
        $cartItems = Cart::where('user_id', $userId)->with(['product'])->get();
        // dd($cartItems);
        $totalItems = $cartItems->sum('count');
        $productCounts = $cartItems->groupBy('product_id')->map->sum('count');

        // return response()->json($cartItems);

        return response()->json( [
            'total_items' => $totalItems,
            'productsCount' => $productCounts,
            'cart_items' => CartResource::collection($cartItems),
        ]);
    }

    public function clearCart($userId)
    {
        Cart::where('user_id', $userId)->delete();

        return response()->json(['message' => 'Cart cleared'], 200);
    }

    public function deleteCartItem($cartId)
    {
        $cartItem = Cart::find($cartId);

        if ($cartItem) {
            $cartItem->delete();
        } else {
            return response()->json(['message' => 'Cart Item not found'], 404);
        }
        return response()->json(['message' => 'Cart Item deleted'], 200);
    }

    /*
    {
        count: 22,
    }
    */

    public function updateCount(Request $request, $cartId)
    {
        // get data
        $data = json_decode($request->getContent(), true);

        $validator = Validator::make($data, [
            'count' => 'required|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(["message" => "bad request"], 404);
        }

        $cart = Cart::find($cartId);
        if (!$cart) {
            return response()->json(["message" => "no cart with this id"], 404);
        }
        $cart->count = $data['count'];
        $cart->save();

        return response()->json(["message" => "cart updated successfully"], 200);
    }
}
