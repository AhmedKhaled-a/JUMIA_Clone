<?php

namespace App\Http\Controllers;
use App\Models\Viewed_Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
// use App\Http\Controllers\User;
use App\Models\Product;
use App\Models\Review;
use App\Models\User;
// use App\Http\Controllers\Carbon\Carbon;
use Carbon\Carbon;


class ViewedProductsController extends Controller

 

{
        
        public function storeviewProduct(Request $request){
            $data = json_decode($request->getContent(), true);
            
             $result=Viewed_Product::where('user_id',$data['user_id'])
             ->where('product_id',$data['product_id'])
             ->first();
            
            
            if(!$result){
              
                $viewProduct =new Viewed_Product();
                $viewProduct->user()->associate(User::find($data['user_id']));
                $viewProduct->product()->associate(Product::find( $data['product_id']));
                $viewProduct->viewed_at=Carbon::now();
                $viewProduct->user_id=$data['user_id'];
                $viewProduct->product_id=$data['product_id'];
                $viewProduct->save();
                return response()->json(['message' => 'Viewd product saved']);
            }
            else{
            // $updated_view=$result->viewed_at;
            // dd($updated_view);
            $result->viewed_at=Carbon::now();
           
            
             $result->save();
                return response()->json(['message' => 'View updated']);
            }
                
            }
           
            public function getViewedProducts(string $userId)
            {
                // $savedProducts = Product::join('products', 'products.id', '=', 'saved_products.product_id')
                // ->join('users', 'saved_posts.user_id', '=', 'users.id')->where('users.id', '=', $id)->get();
                // $user = User::find($userId);
                // dd($user->viewed_products);
                    $data = [
                        'viewed_products' => Viewed_Product::where('user_id', $userId)->with('product')->get(),
                    ];
                    // return SavedProductsResource::collection($user->saved_products);
                    // dd($user->saved_products[1]->id);
                    return response()->json($data);
            }       
            
}
       
    
      
           
    
