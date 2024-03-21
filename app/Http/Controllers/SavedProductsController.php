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
            return response()->json(['message' => 'an error'] , 404);
        }
    }

    // get json of product_id
    /**
     * { product_id : 1 }
     */
    public function saveProduct(Request $request, string $userId)
    {
        // findout if it's saved or not
        // dd(json_decode($this->isSavedProduct($request, $userId)->getContent(), true));
        $isSaved = json_decode($this->isSavedProduct($request, $userId)->getContent(), true)['is_saved'];
        if (!$isSaved) {
            // get data 
            $data = json_decode($request->getContent(), true);
            // find user
            $user = User::find($userId);
            if (!$user) {
                return response()->json(['message' => 'user not found']);
            }
            // find product
            $product = Product::find($data['product_id']);
            if (!$product) {
                return response()->json(['message' => 'product not found']);
            }
            // add saved_product
            $savedProduct = new Saved_Product();
            $savedProduct->user()->associate($user);
            $savedProduct->product()->associate($product);
            $savedProduct->save();
            return response()->json(['message' => 'saved product correctly']);
        } else {
            return response()->json(['message' => 'already saved']);
        }
    }
    /**
     * { product_id : 1 }
     */
    public function isSavedProduct(Request $request, string $userId)
    {
        $data = json_decode($request->getContent(), true);

        $product = Saved_Product::join('users', 'saved_products.user_id', '=', 'users.id')
            ->join('products', 'products.id', '=', 'saved_products.product_id')
            ->where('products.id', '=', $data['product_id'])
            ->where('users.id', '=', $userId);

        if (!empty($product->get()->toArray())) {
            return response()->json(['is_saved' => true]);
        }
        return response()->json(['is_saved' => false]);
    }
    /**
     * { product_id : 1 }
     */
    public function unsaveProduct(Request $request, string $userId)
    {
        $isSaved = json_decode($this->isSavedProduct($request, $userId)->getContent(), true)['is_saved'];

        if ($isSaved) {
            $data = json_decode($request->getContent(), true);
            // remove
            $saved = Saved_Product::where('user_id' , $userId)->where('product_id' , $data['product_id']);
            $saved->delete();
            return response()->json(['message' => 'product removed successfully']);

        } else {
            return response()->json(['message' => 'not a saved product'] , 404);
        }
    }
}
