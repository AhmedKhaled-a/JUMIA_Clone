<?php

namespace App\Http\Controllers;

use App\Errors;
use App\Models\Seller;
use Hamcrest\Core\Set;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Mail\resetPasswordMail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use App\Mail\jumiaVerificationEmailForSellers;
use App\Mail\resetPasswordLinkForSellers;
use Illuminate\Support\Facades\Redirect;

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
    public function index() 
    {
        return response()->json(['sellers' => Seller::all()], 200);
    }
    public function destroy(string $sellerId) 
    {   
        $seller = Seller::find($sellerId);
        if(!$seller) {
              return response()->json(["code" => Errors::ERR_SELLER_NOT_FOUND, 'message' => 'Seller not found'] , 404);
        }

        $seller->delete();
        return response()->json("seller delete successfully" , 201);
    }
    
    public function register(Request $request) {
        $data = json_decode($request->getContent(), true);
        if (empty($data)) {
            return response()->json(["code" => Errors::ERR_EMPTY_REQ, 'message' => 'Empty request'] , 404);
        }

        $validator = Validator::make($data, [
            'fullname' => 'required',
            'shop_name' => "required|unique:sellers,shop_name",
            'email' => 'required|unique:sellers,email',
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
        return response()->json(['code' => Errors::ERR_NO_ERR, 'message' => 'please check your email for verification link']); 
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

            // return response()->json([
            //     'success'=> true,
            //     'message'=> 'You have successfully verified your email address.'
            // ]);

            return Redirect::away(env('REACT_APP_URL' , 'http://127.0.0.1:3000') . '/verification/success');
        }

        return response()->json(['success'=> false, 'error'=> "Verification code is invalid."]);

    }

    public function resetPasswordLink(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        // dd($data['email']);
        $seller = Seller::where('email', '=', $data['email'])->first();
        // dd($seller);
        if (!empty($seller)){
            $remember_token =str::random(20);
            // DB::table('users')->insert(['user_id'=>$user->id,'remember_token'=>$remember_token]);
            $seller->remember_token=$remember_token;
            $seller->save();
            Mail::to($data['email'])->send(new resetPasswordLinkForSellers($remember_token));
            return response()->json(['code' => Errors::ERR_NO_ERR, 'message' => 'please check your email for reset password link  ']); 

        }else{
            
            return response()->json([
                'status'=> false,
                'message'=> 'please enter a valied email.'
            ]);
        }
    }
    public function reset($remember_token){
        $seller = Seller::where('remember_token', '=', $remember_token)->first();
        
       
        if (!empty($seller)){
           $data['user']=$seller;
           return ($data);
   }
   else{
       abort(404);
   }
}

public function postResetPasswordLink(Request $request,$remember_token) {
   
    $seller=Seller::where('remember_token', '=', $remember_token)->first();
    // dd($seller);
    if (!empty($seller)){
       
        $seller->password=Hash::make($request->password);
        $remember_token =str::random(20);
        $seller->remember_token=$remember_token;
        $seller->save();
        
        return response()->json([
            'status'=> true,
            'message'=> 'your password has been changed and you can login now.'
        ]);
        
}
else{
    abort(404);}
    }     

}
