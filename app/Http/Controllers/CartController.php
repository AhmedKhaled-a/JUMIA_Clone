<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Cart;
use App\Http\Resources\CartResource;

class CartController extends Controller
{
    public function addItem(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer',
            'product_id' => 'required|integer',
            'count' => 'required|integer|min:1',
            'price' => 'required|integer|min:0',
        ]);

        $cart = new Cart();
        $cart->user_id = $request->user_id;
        $cart->product_id = $request->product_id;
        $cart->count = $request->count;
        $cart->price = $request->price;
        $cart->save();

        return response()->json(['message' => 'Item added to cart successfully']);
    }

    public function getCart($userId)
    {
        $cartItems = Cart::where('user_id', $userId)->get();
        $totalItems = $cartItems->sum('count');
        $productCounts = $cartItems->groupBy('product_id')->map->sum('count');

        return [
            'total_items' => $totalItems,
            'productsCount' => $productCounts,
            'cart_items' => CartResource::collection($cartItems),
        ];
    }

    public function clearCart($userId)
    {
        Cart::where('user_id', $userId)->delete();

        return response()->json(['message' => 'Cart cleared']);
    }

    public function updateCount(Request $request, $cartId)
    {
        $request->validate([
            'count' => 'required|integer|min:1',
        ]);

        $cart = Cart::findOrFail($cartId);
        $cart->count = $request->count;
        $cart->save();

        return new CartResource($cart);
    }
}

