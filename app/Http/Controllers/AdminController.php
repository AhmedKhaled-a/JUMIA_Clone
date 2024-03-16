<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $admins = Admin::all();
        if($admins->count() > 0) {
            return response()->json($admins, JsonResponse::HTTP_OK);
        } else {
            return response()->json(['message' => 'No Admins found'], JsonResponse::HTTP_NOT_FOUND);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Check if the authenticated user is a super admin
        // $user = auth()->user();
        // if (!$user || !$user->is_super_admin ) { // Check if the authenticated user is a super admin
        //     return response()->json(['error' => 'Unauthorized'], JsonResponse::HTTP_UNAUTHORIZED);
        // }

        $validatedData = Validator::make($request->all(), [
            'username' => 'required|unique:admins',
            'password' => 'required',
            'email' => 'required|email|unique:admins',
        ]);

        if ($validatedData->fails()) {
            return response()->json($validatedData->errors(), 400);
        }

        $admin = new Admin();
        $admin->username = $request['username'];
        $admin->password = bcrypt($request['password']);
        $admin->email = $request['email'];

        // Associate super admin ID
        // $admin->super_admin_id = auth()->user()->id;
        $admin->super_admin_id = 1;

        $admin->save();

        return response()->json(['message' => 'Admin created successfully'], JsonResponse::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

        // Check if the authenticated user is a super admin
        // $user = auth()->user();
        // if (!$user || !$user->is_super_admin ) { // Check if the authenticated user is a super admin
        //     return response()->json(['error' => 'Unauthorized'], JsonResponse::HTTP_UNAUTHORIZED);
        // } else {
        // }
        $admin = Admin::find($id);

        if($admin) {
            return response()->json($admin, JsonResponse::HTTP_OK);
        } else {
            return response()->json(['message' => 'Admin not found'], JsonResponse::HTTP_NOT_FOUND);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Check if the authenticated user is a super admin
        // $user = auth()->user();
        // if(!user || !user->is_super_admin) {
        //     return response()->json(['error' => 'Unauthorized'], JsonResponse::HTTP_UNAUTHORIZED);
        // } else {

        // }
        $validatedData = Validator::make($request->all(), [
            'username' => 'required|unique:admins',
            'password' => 'required',
            'email' => 'required|email|unique:admins',
        ]);

        if ($validatedData->fails()) {
            return response()->json($validatedData->errors(), 400);
        }

        $admin = Admin::find($id);
        if($admin) {
            $admin->username = $request['username'];
            $admin->password = bcrypt($request['password']);
            $admin->email = $request['email'];
            $admin->save();
            return response()->json(['message' => 'Admin updated successfully'], JsonResponse::HTTP_OK);
        } else {
            return response()->json(['message' => 'Admin not found'], JsonResponse::HTTP_NOT_FOUND);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Check if the authenticated user is a super admin
        // $user = auth()->user();
        // if(!user || !user->is_super_admin) {
        //     return response()->json(['error' => 'Unauthorized'], JsonResponse::HTTP_UNAUTHORIZED);
        // } else {

        // }

    // $authenticatedUserId = auth()->user()->id;
    $admin = Admin::find($id);

    if($admin) {
        // Prevent admin from deleting themselves
        // if ($admin->id === $authenticatedUserId) {
        //     return response()->json(['message' => 'You cannot delete yourself'], JsonResponse::HTTP_FORBIDDEN);
        // }

        $admin->delete();
        return response()->json(['message' => 'Admin deleted successfully'], JsonResponse::HTTP_OK);
    } else {
        return response()->json(['message' => 'Admin not found'], JsonResponse::HTTP_NOT_FOUND);
    }

    }
}
