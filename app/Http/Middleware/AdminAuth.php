<?php

namespace App\Http\Middleware;

use App\Models\Admin;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AdminAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        /* note : I'm really not proud of this code really ,but it works okay so don't judge me */

        // dd();
        // $token = request()->header('authorization');
        $id = JWTAuth::parseToken()->authenticate();
        // dd($id);
        $admin = Admin::find($id);
        // dd($admin);
        if (!$admin) {
            abort(401, "Hey you're not an admin !! (;");
        }
        return $next($request);
    }
}
