<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class AuthController extends Controller
{
    // public function superAdminLogin(Request $request)
    // {
    //     $credentials = $request->only('email', 'password');

    //     try {
    //         if (! $token = JWTAuth::attempt($credentials)) {
    //             return response()->json(['error' => 'Invalid credentials'], 401);
    //         }
    //     } catch (JWTException $e) {
    //         return response()->json(['error' => 'Could not create token'], 500);
    //     }

    //     $user = JWTAuth::user();

    //     if ($user->role !== 'super_admin') {
    //         return response()->json(['error' => 'Unauthorized'], 401);
    //     }

    //     return response()->json(compact('token'));
    // }

//     public function adminRegister(Request $request)
//     {
//         // Validate the incoming request data
//         $validator = Validator::make($request->all(), [
//             'fullname' => 'required|string|max:255',
//             'email' => 'required|email|unique:users|max:255',
//             'password' => 'required|string|min:6|max:255',
//             'gender' => 'required|in:female,male',
//             'username' => 'required|string|unique:users|max:255',
//             'phone_number' => 'required|string|max:255',
//             'address_country' => 'required|string|max:255',
//             'address_city' => 'required|string|max:255',
//             'address_district' => 'required|string|max:255',
//             'role_id' => 'required|integer',
//         ]);

//       // Check if validation fails
//       if ($validator->fails()) {
//         return response()->json(['error' => $validator->errors()], 400);
//     }

//     // Create the new user
//     $user = User::create([
//         'fullname' => $request->fullname,
//         'email' => $request->email,
//         'password' => Hash::make($request->password),
//         'role_id' => '2',
//     ]);

//     // Generate a JWT token for the newly registered admin
//     $token = Auth::login($user);

//     // Return a success response with the JWT token
//     return response()->json(['message' => 'Admin registered successfully', 'user' => $user, 'token' => $token], 201);
// }



    public function adminLogin(Request $request)
    {
        $credentials = $request->only('email', 'password');

        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Invalid credentials'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'Could not create token'], 500);
        }

        $user = JWTAuth::user();

        if ($user->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return response()->json(compact('token'));
    }

    public function register(Request $request)
    {
        $request->validate([
            'fullname' => 'required|string|max:255',
            'email' => 'required|email|unique:users|max:255',
            'password' => 'required|string|min:6|max:255',
            'gender' => 'required|in:female,male',
            'username' => 'required|string|unique:users|max:255',
            'phone_number' => 'required|string|max:255',
            'address_country' => 'required|string|max:255',
            'address_city' => 'required|string|max:255',
            'address_district' => 'required|string|max:255',
            'role_id' => 'required|integer',
        ]);

        $user = User::create([
            'fullname' => $request->fullname,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'gender' => $request->gender,
            'username' => $request->username,
            'phone_number' => $request->phone_number,
            'address_country' => $request->address_country,
            'address_district' => $request->address_district,
            'address_city' => $request->address_city,
            'role_id' => $request->role_id,
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json(['user' => $user, 'access_token' => $token], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $credentials = $request->only('email', 'password');

        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Unauthenticated'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'Could not create token'], 500);
        }

        return response()->json(['access_token' => $token]);
    }

    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
