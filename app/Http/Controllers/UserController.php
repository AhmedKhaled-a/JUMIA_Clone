<?php
/*
{
    "fullname":"Ahmed",
    "email":"ahmed@gmail.com",
    "password":"12345678",
    "gender":"male",
    "username":"ahmood",
    "phone_number":"012333444111",
    "address_country":"EG",
    "address_city":"ALX",
    "address_district":"CO",
}
*/

namespace App\Http\Controllers;

use App\Errors;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function register(Request $request) {
        $data = json_decode($request->getContent(), true);
        if (empty($data)) {
            return response()->json(["code" => Errors::ERR_EMPTY_REQ, 'message' => 'Empty request'] , 404);
        }

        $validator = Validator::make($data, [
            'fullname' => 'required|string',
            'username' => "required|unique:users,username",
            'email' => 'required|unique:users,email',
            'password' => "required",
            'gender' => "required",
            'phone_number' => "required",
            'address_country' => "required",
            'address_city' => "required",
            'address_district' => "required"
        ]);

        if($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $data['password'] = Hash::make($data['password']);

        User::create($data);
        return response()->json(['code' => Errors::ERR_NO_ERR, 'message' => 'user registered successfully']); 
    }
}
