<?php

// app/Http/Middleware/AdminMiddleware.php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (auth()->user()->role->name == 'admin'){
            return $next($request);
        }

        return response()->json(['message' => 'Unauthorized. You need admin privileges.'], 401);
    }
}
