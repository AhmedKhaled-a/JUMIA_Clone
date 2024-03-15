<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\category;
use Illuminate\Http\Request;

class categoryController extends Controller
{
    public function index()
    {
        $categories = category::all();
        // dd(response()->json($categories));
        return response()->json($categories);
    }
}
