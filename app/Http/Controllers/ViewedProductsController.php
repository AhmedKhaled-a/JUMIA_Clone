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
                $viewProduct->save();
                return response()->json(['message' => 'Viewd product saved']);
            }
            else{
           
            $result->viewed_at=Carbon::now();
             $result->save();
                return response()->json(['message' => 'View updated']);
            }
                
            }
           
           
            
}
       
    
      
           
    
