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

        // $category=category::create($request->all());
        // if ($category){
        //     return response()->json(new categoryResource( $category));
        // }
        // else {
        //     return response()->json(["message" => "No category with this id"]);
        // }





        // get data
        $data = json_decode($request->getContent(), true);

        $validator = Validator::make($data['category'], [
            'id' => 'required',
            'name'=>'required|string|max:255',
            'category_thumb'=>'required',
            'super_category_id'=>'required'
        ]);
        if ($validator->fails()) {
            return response()->json(["message" => "error happend bad data bro..."]);
        } 
        else {
            
            $category = category::create([
                'id' =>'',
                'name' => $data['category']['name'],
                'category_thumb'=>$data['category']['category_thumb'],
                'super_category_id'=>$data['category']['super_category_id'],
            ]);
            // store the review
            // associate review with product , user
        //     $user = User::find($data['user']['id']);
        //     if(!$user) {
        //         return response()->json(["message" => "No user with this id"]);
        //     }
        //     $msg->user()->associate($user);
        //     $msg->writer = $msg->user->username;
        //     $msg->save();

        //     return response()->json(["message" => "added successfully"]);
        // }
    }

    
}
