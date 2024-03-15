<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('cart')->group(function () {
    Route::post('/add/{user_id}', [CartController::class, 'addItem']);
    Route::get('/usercart/{user_id}', [CartController::class, 'getCart']);
    Route::delete('/usercart/{user_id}', [CartController::class, 'clearCart']);
    Route::put('/{cartId}/update-count', [CartController::class, 'updateCount']);
});
