<?php

namespace App\Http\Controllers;

use App\Errors;
use App\Models\Seller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

/*
{
    "shop_name":"Ahmed",
    "email":"ahmed@gmail.com",
    "password":"12345678",
    "gender":"male",
    "username":"ahmood",
    "phone_number":"012333444111"
}
*/

class SellerController extends Controller
{
    public function register(Request $request) {
        $data = json_decode($request->getContent(), true);
        if (empty($data)) {
            return response()->json(["code" => Errors::ERR_EMPTY_REQ, 'message' => 'Empty request'] , 404);
        }

        $validator = Validator::make($data, [
            'fullname' => 'required',
            'shop_name' => "required|unique:sellers,shop_name",
            'email' => 'required|unique:users,email',
            'password' => "required",
            'phone_number' => "required",
        ]);

        if($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $data['password'] = Hash::make($data['password']);

        Seller::create($data);
        return response()->json(['code' => Errors::ERR_NO_ERR, 'message' => 'seller registered successfully']); 
    }
}
