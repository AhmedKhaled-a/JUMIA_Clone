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
use App\Mail\jumiaVerifcation;
use App\Mail\resetPasswordMail;
use App\Mail\Varification;
// use Mail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
// use App\Models\Mail;
// use Illuminate\Mail\Message;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

// use App\Http\Controller\Mail;

// use App\Mail\SampleMail;
// use JWTAuth;


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

        $user=User::create($data);

        $verification_code = Str::random(20); //Generate verification code
        DB::table('user_verifications')->insert(['user_id'=>$user->id,'token'=>$verification_code]);

        Mail::to($data['email'])->send(new jumiaVerifcation($verification_code));


        return response()->json(['code' => Errors::ERR_NO_ERR, 'message' => 'user registered successfully']);
    }



     public function verifyUser($verification_code)
    {
        $check = DB::table('user_verifications')->where('token',$verification_code)->first();

        if(!is_null($check)){
            $user = User::find($check->user_id);

            if($user->is_verified == 1){
                return response()->json([
                    'success'=> true,
                    'message'=> 'Account already verified..'
                ]);
            }

            $user->update(['is_verified' => 1]);
            DB::table('user_verifications')->where('token',$verification_code)->delete();

            return response()->json([
                'success'=> true,
                'message'=> 'You have successfully verified your email address.'
            ]);
        }

        return response()->json(['success'=> false, 'error'=> "Verification code is invalid."]);

    }



    public function resetPasswordLink(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        // dd($data);
        $user = User::where('email', '=', $data['email'])->first();
        if (!empty($user)){
            $remember_token =str::random(20);
            // DB::table('users')->insert(['user_id'=>$user->id,'remember_token'=>$remember_token]);
            $user->remember_token=$remember_token;
            $user->save();
            Mail::to($data['email'])->send(new resetPasswordMail($remember_token));
            return response()->json(['code' => Errors::ERR_NO_ERR, 'message' => 'please check your email for reset password link  ']);

        }else{

            return response()->json([
                'status'=> false,
                'message'=> 'please enter a valied email.'
            ]);
        }
    }



    public function reset($remember_token){
         $user = User::where('remember_token', '=', $remember_token)->first();
         dd($user);

         if (!empty($user)){
            $data['user']=$user;
            return ($data);
    }
    else{
        abort(404);
    }
}


public function postResetPasswordLink(Request $request,$remember_token) {

    $user=User::where('remember_token', '=', $remember_token)->first();
    // dd($user);
    if (!empty($user)){

        $user->password=Hash::make($request->password);
        $remember_token =str::random(20);
        $user->remember_token=$remember_token;
        $user->save();

        return response()->json([
            'status'=> true,
            'message'=> 'your password has been changed and you can login now.'
        ]);

}
else{
    abort(404);}
    }
}
