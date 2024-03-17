<?php
    namespace App\Http\Controllers;
    
    use App\Models\Admin;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Auth;
    use Illuminate\Support\Facades\Hash;
    
    class AdminController extends Controller
    {
        public function index() {
            return response()->json(Admin::all());
        }
        public function store(Request $request)
        {
            // Check if the authenticated user is a super admin
            if (!Auth::user()->isSuperAdmin()) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
    
            // Validate request data
            $request->validate([
                'username' => 'required|string|unique:admins',
                'password' => 'required|string',
                'email' => 'required|email|unique:admins',
            ]);
    
            // Create a new admin
            $admin = new Admin();
            $admin->username = $request->username;
            $admin->password = Hash::make($request->password);
            $admin->email = $request->email;
            $admin->save(); 
    
            return response()->json(['message' => 'Admin created successfully'], 201);
        }
        
        public function update(Request $request, $id)
        {
            // Check if the authenticated user is a super admin
            if (!Auth::user()->isSuperAdmin()) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
    
            // Validate request data
            $request->validate([
                'username' => 'required|string|unique:admins,username,' . $id,
                'password' => 'required|string',
                'email' => 'required|email|unique:admins,email,' . $id,
            ]);
    
            // Find the admin by id
            $admin = Admin::findOrFail($id);
    
            // Update admin details
            $admin->username = $request->username;
            $admin->password = Hash::make($request->password);
            $admin->email = $request->email;
            $admin->save();
    
            return response()->json(['message' => 'Admin updated successfully'], 200);
        }
    
        public function destroy($id)
        {
            // Check if the authenticated user is a super admin
            if (!Auth::user()->isSuperAdmin()) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
    
            // Find the admin by id and delete it
            $admin = Admin::findOrFail($id);
            $admin->delete();
    
            return response()->json(['message' => 'Admin deleted successfully'], 200);
        }
    
        public function adminLogin(Request $request)
        {
            // Validate request data
            $request->validate([
                'email' => 'required|email',
                'password' => 'required|string',
            ]);
    
            if (Auth::guard('admin')->attempt($request->only('email', 'password'))) {
                $token = Auth::guard('admin')->user()->createToken('Admin Access Token')->plainTextToken;
                return response()->json(['token' => $token], 200);
            }
    
            return response()->json(['error' => 'Unauthorized'], 401);
        } }