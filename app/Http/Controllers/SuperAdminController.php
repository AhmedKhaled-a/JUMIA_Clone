<?php
// SuperAdminController.php
namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;

class SuperAdminController extends Controller
{
    public function store(Request $request)
    {
        $admin = new Admin();
        $admin->username = $request->username;
        $admin->password = bcrypt($request->password);
        $admin->email = $request->email;
        $admin->save();

        return response()->json(['message' => 'Admin created successfully'], 201);
    }

    public function update(Request $request, $id)
    {
        $admin = Admin::findOrFail($id);
        $admin->username = $request->username;
        $admin->password = bcrypt($request->password);
        $admin->email = $request->email;
        $admin->save();

        return response()->json(['message' => 'Admin updated successfully'], 200);
    }

    public function destroy($id)
    {
        $admin = Admin::findOrFail($id);
        $admin->delete();

        return response()->json(['message' => 'Admin deleted successfully'], 200);
    }
}

