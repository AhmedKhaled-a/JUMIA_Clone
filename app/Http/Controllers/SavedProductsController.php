<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Saved_Product;
use App\Models\User;
use Illuminate\Http\Request;

class SavedProductsController extends Controller
{
    /*
    {
        products : []
        productImages: []

    }
        */
    public function getSavedProducts(string $userId)
    {
        // $savedProducts = Product::join('products', 'products.id', '=', 'saved_products.product_id')
        // ->join('users', 'saved_posts.user_id', '=', 'users.id')->where('users.id', '=', $id)->get();
        $user = User::find($userId);
        if ($user) {
            $data = [
                'products' => $user->saved_products,
            ];
            // return SavedProductsResource::collection($user->saved_products);
            // dd($user->saved_products[1]->id);
            return response()->json($data);
        } else {
            return response()->json(['message' => 'an error']);
        }
    }

    // get json of product_id
    /**
     * { product_id : 1 }
     */
    public function saveProduct(Request $request ,string $userId)
    {

    }

    public function isSavedProduct(Request $request , string $userId)
    {
        $data = json_decode($request->getContent(), true);

        $product = Saved_Product::join('users', 'saved_products.user_id', '=', 'users.id')
        ->join('products', 'products.id', '=', 'saved_products.product_id')
        ->where('products.id', '=', $data['product_id'])
        ->where('users.id', '=', $userId);
        // dd();

        if(!empty($product->get()->toArray())) {
            return response()->json(['isSaved' => true]);
        }
        return response()->json(['isSaved' => false]);
    }

    public function unsaveProduct(Request $request ,string $userId)
    {
        
    }
}
