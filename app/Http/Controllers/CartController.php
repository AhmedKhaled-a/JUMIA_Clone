<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Cart;
use App\Http\Resources\CartResource;
use Illuminate\Support\Facades\Validator;

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
        $cartItems = Cart::where('user_id', $userId)->with(['product'])->get();
        // dd($cartItems);
        $totalItems = $cartItems->sum('count');
        $productCounts = $cartItems->groupBy('product_id')->map->sum('count');

        // return response()->json($cartItems);
         
        return [
            'total_items' => $totalItems,
            'productsCount' => $productCounts,
            'cart_items' => CartResource::collection($cartItems),
        ];
    }

    public function clearCart($userId)
    {
        Cart::where('user_id', $userId)->delete();

        return response()->json(['message' => 'Cart cleared'], 200);
    }

    public function deleteCartItem($cartId)
    {
        $cartItem = Cart::find($cartId);

        if($cartItem) {
            $cartItem->delete();
        }
        else {
            return response()->json(['message' => 'Cart Item not found'] , 404);
        }
        return response()->json(['message' => 'Cart Item deleted'] , 200);
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

        if($validator->fails()) {
            return response()->json(["message" => "bad request"] , 404);
        }

        $cart = Cart::find($cartId);
        if(!$cart) {
            return response()->json(["message" => "no cart with this id"] , 404);
        
        }
        $cart->count = $data['count'];
        $cart->save();

        return response()->json(["message" => "cart updated successfully"] , 200);
    }
}

