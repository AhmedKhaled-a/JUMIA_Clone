<?php

namespace App\Http\Controllers\api;

use App\Models\User;
use App\Models\category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\categoryResource;
use Dotenv\Util\Str;
use Illuminate\Support\Facades\Validator;
use PhpParser\Node\Expr\Cast\String_;

class categoryController extends Controller
{
    public function index()
    {
        $categories = category::all();
        // dd(response()->json($categories));
        return response()->json($categories);
    }

    public function show(string $id){
        $category=category::find($id);
        if ($category){
            return response()->json(new categoryResource( $category));
        }
        else {
            return response()->json(["message" => "No category with this id"]);
        }
        
    }

    public function store(Request $request)
    {
        
        
        $data = json_decode($request->getContent(), true);
        // dd($data);
        $validator = Validator::make($data['category'], [
            'name' => 'required|string|max:255',
            'id'=>'required',
            
        ]);
        if ($validator->fails()) {
            return response()->json(["message" => "error happend bad data bro..."]);
        } else{
            $category = category::create([
                'id'=>$data['category']['id'], 
                'name'=>$data['category']['name'],
                'category_thumb'=>$data['category']['category_thumb'],
                'super_category_id'=>$data['category']['super_category_id']
            ]);
        }
            $super_category=Category::find($data['category']['super_category_id']);
            $category->super_category()->associate($super_category);
            $category->save();

            return response()->json(["message" => "added successfully"]);
           
    }
    public function update(Request $request,String $id){
        $data = json_decode($request->getContent(), true);
        // dd($data);
        $validator = Validator::make($data['category'], [
            'name' => 'required|string|max:255',
            
            
        ]);
        if ($validator->fails()) {
            return response()->json(["message" => "error happend bad data bro..."]);
        } else{
            $category = Category::find($id);
            if ($category){
                $category->update([
                    'name'=>$data['category']['name'],
                    'category_thumb'=>$data['category']['category_thumb'],
                    'super_category_id'=>$data['category']['super_category_id']
                ]);
             return response()->json(["message" => "updated successfully"]);
        } else {
            return response()->json(["message" => "error happend bad data bro..."]);
        }
            
        }
           
    }
    public function destroy(string $id)
    {
        $category = category::find($id);
        if ($category) {
            // remove review
            $category->delete();
            return response()->json(["message" => "removed successfully"]);
        } else {
            return response()->json(["message" => "not deleted bro..."]);
        }
    }
    

    
}
