<?php

namespace App\Http\Controllers;

use App\Errors;
use App\Mail\jumiaVerificationEmailForSellers;
use App\Models\Seller;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
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

        $seller=Seller::create($data);
        $verification_code = Str::random(20);
        DB::table('seller_verification')->insert(['seller_id'=>$seller->id,'token'=>$verification_code]);
        Mail::to($data['email'])->send(new jumiaVerificationEmailForSellers($verification_code));
        return response()->json(['code' => Errors::ERR_NO_ERR, 'message' => 'seller registered successfully']); 
    }
    
    
    
    
    public function verifySeller($verification_code)
    {
        $check = DB::table('seller_verification')->where('token',$verification_code)->first();
        
        if(!is_null($check)){
            $seller = Seller::find($check->seller_id);

            if($seller->is_verified == 1){
                return response()->json([
                    'success'=> true,
                    'message'=> 'Account already verified..'
                ]);
            }

            $seller->update(['is_verified' => 1]);
            DB::table('seller_verification')->where('token',$verification_code)->delete();

            return response()->json([
                'success'=> true,
                'message'=> 'You have successfully verified your email address.'
            ]);
        }

        return response()->json(['success'=> false, 'error'=> "Verification code is invalid."]);

    }
}
