<?php

use App\Http\Controllers\MessageController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\SavedProductsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;

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
//**************************************** Cart ********************************/
Route::prefix('cart')->group(function () {
    Route::post('/add/{user_id}', [CartController::class, 'addItem']);
    Route::get('/usercart/{user_id}', [CartController::class, 'getCart']);
    Route::delete('/usercart/{user_id}', [CartController::class, 'clearCart']);
    Route::put('/{cartId}/update-count', [CartController::class, 'updateCount']);
});

//**************************************** Reviews ********************************/

Route::get('/reviews', [ReviewController::class, 'index'])
->name("reviews.index");

Route::get('/reviews/create', [ReviewController::class, 'create'])->name('reviews.create');


Route::post('/reviews', [ReviewController::class, 'store'])
->name('reviews.store');

// Route::get('/reviews/{id}', [ReviewController::class, 'show'])
// ->name('reviews.show');

// ex : /api/reviews/getbyproduct?prodId=1
Route::get('/reviews/get-by-product', [ReviewController::class, 'getProductReviews'])
->name('reviews.getbyproduct');

// Route::get('/reviews/{id}/edit', [ReviewController::class, 'edit'])
// ->name('reviews.edit');

Route::put('/reviews/{id}', [ReviewController::class, 'update'])
->name('reviews.update');

Route::delete('/reviews/{id}', [ReviewController::class, 'destroy'])
->name('reviews.destroy');

/**************************************** Messages ************************************************/

Route::get('/messages', [MessageController::class, 'index'])
->name("messages.index");

// Route::get('/messages/create', [MessageController::class, 'create'])
// ->name('messages.create');


Route::post('/messages', [MessageController::class, 'store'])
->name('messages.store');

Route::get('/messages/{id}', [MessageController::class, 'show'])
->name('messages.show');

Route::get('/messages/{id}/edit', [MessageController::class, 'edit'])
->name('messages.edit');

Route::put('/messages/{id}', [MessageController::class, 'update'])
->name('messages.update');

Route::delete('/messages/{id}', [MessageController::class, 'destroy'])
->name('messages.destroy');

/**************************************** Saved Products ************************************************/

Route::get('/products/user-saved/{userId}', [SavedProductsController::class, 'getSavedProducts'])
->name("saved.index");

Route::post('/products/save/{userId}', [SavedProductsController::class, 'saveProduct'])
->name("saved.save");

Route::get('/products/is-saved/{userId}', [SavedProductsController::class, 'isSavedProduct'])
->name("saved.isSaved");

Route::post('/products/unsave/{userId}', [SavedProductsController::class, 'unsaveProduct'])
->name("saved.unsave");

/*
|--------------------------------------------------------------------------
| Products Routes
|--------------------------------------------------------------------------
*/

Route::group(['prefix' => 'products'], function () {
    Route::get('/', [ProductController::class, 'index']);
    Route::get('/{id}', [ProductController::class, 'show'])->where('id', '[0-9]+');
    Route::post('/add-product', [ProductController::class, 'store']);
    Route::put('/update-product/{id}', [ProductController::class, 'update'])->where('id', '[0-9]+');
    Route::delete('/delete-product/{id}', [ProductController::class, 'destroy'])->where('id', '[0-9]+');
});


/**************************************** Orders ************************************************/
// TODO: Reduce Count in DB automatically when order is made
Route::post('/orders', [OrderController::class , 'store'])
->name('orders.store'); // takes a cart array and stores them

Route::get('/orders/user/{userId}', [OrderController::class , 'getForUser'])
->name('orders.store');

Route::put('/orders/{orderId}', [OrderController::class , 'changeOrderStatus'])
->name('orders.store');

// Admins only 
Route::delete('/orders/{orderId}', [OrderController::class , 'deleteOrder'])
->name('orders.store');