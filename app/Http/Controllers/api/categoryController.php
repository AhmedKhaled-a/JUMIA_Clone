<?php

namespace App\Http\Controllers\api;

use App\Models\User;
use App\Models\category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\categoryResource;
use Illuminate\Support\Facades\Validator;

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
        $data=$request->all();
        dd($data);
        // $data = json_decode($request->getContent(), true);
        $validator = Validator::make($data['category'], [
            'name' => 'required|string|max:255',
            'id'=>'required',
            
        ]);
        if ($validator->fails()) {
            return response()->json(["message" => "error happend bad data bro..."]);
        } else{
            $category = category::create([
                'name'=>$data['category']['name'],
                'id'=>$data['category']['id'], 
                'category_thumb'=>$data['category']['category_thumb'],
                'super_category_id'=>$data['category']['super_category_id']
            ]);
        }
            $super_category=Category::finf($data ['super_category_id']);
            $category->super_category()->associate($super_category);
            $category->save();

            return response()->json(["message" => "added successfully"]);
           
    }

    
}
