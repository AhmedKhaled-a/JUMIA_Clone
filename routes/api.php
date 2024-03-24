<?php


use App\Http\Controllers\AdminController;

use App\Http\Controllers\api\CategoryController;
use App\Http\Controllers\Auth\AuthAdminController;
use App\Http\Controllers\Auth\AuthSellerController;
use App\Http\Controllers\Auth\AuthUserController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\SavedProductsController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\SellerController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\ViewedProductsController;
use App\Models\Seller;


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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

//**************************************** Cart ********************************/
Route::prefix('cart')->group(function () {
    Route::post('/add/{user_id}', [CartController::class, 'addItem']);

    Route::get('/total/{user_id}', [CartController::class, 'getCartTotal']);

    Route::get('/usercart/{user_id}', [CartController::class, 'getCart']);
    Route::delete('/usercart/{user_id}', [CartController::class, 'clearCart']);
    Route::delete('/{cart_id}', [CartController::class, 'deleteCartItem']);
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

// ex : /api/reviews/get-by-product?prodId=1
Route::get('/reviews/get-by-product', [ReviewController::class, 'getProductReviews'])
    ->name('reviews.getbyproduct');

// Route::get('/reviews/{id}/edit', [ReviewController::class, 'edit'])
// ->name('reviews.edit');
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
// Route::get('/messages/create', [MessageController::class, 'create'])
// ->name('messages.create');


Route::post('/messages', [MessageController::class, 'store'])
    ->name('messages.store');


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
    Route::get('/get-brands', [ProductController::class, 'getProductBrands']);
});

Route::group(
    [
        'prefix' => 'products',
        // 'middleware' => ['auth:seller']
    ],
    function () {
        Route::post('/add-product', [ProductController::class, 'store']);
        Route::put('/update-product/{id}', [ProductController::class, 'update'])->where('id', '[0-9]+');
        Route::delete('/delete-product/{id}', [ProductController::class, 'destroy'])->where('id', '[0-9]+');
    }
);
Route::get('/seller/{seller_id}', [ProductController::class, 'getSellerProducts'])->where('id', '[0-9]+');


/**************************************** Orders ************************************************/

Route::get('/orders', [OrderController::class, 'index'])
    ->name('orders.index'); // takes a cart array and stores them

Route::post('/orders', [OrderController::class, 'store'])
    ->name('orders.store'); // takes a cart array and stores them

Route::get('/orders/user/{userId}', [OrderController::class, 'getForUser'])
    ->name('orders.get-for-user');

Route::get('/orders/user/{userId}/status/{status}', [OrderController::class, 'getOrdersForUserByStatus'])
    ->name('orders.get-orders-for-user-by-status');

Route::get('/orders/seller/{sellerId}', [OrderController::class, 'getForSeller'])
    ->name('orders.get-for-seller');

Route::put('/orders/{orderId}', [OrderController::class, 'changeOrderStatus'])
    ->name('orders.update');
    
// Admins only
Route::delete('/orders/{orderId}', [OrderController::class, 'deleteOrder'])
    ->name('orders.delete')
    ->middleware('auth:admin');

/**************************************** Sellers ************************************************/
Route::get('/sellers', [SellerController::class, 'index'])->middleware("auth:admin");
Route::delete('/sellers/{sellerId}', [SellerController::class, 'destroy'])->middleware("auth:admin");




/**************************************** categories ************************************************/
Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
Route::get('/categories/create', [CategoryController::class, 'create'])->name('categories.create');
Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
Route::get('/categories/{id}', [CategoryController::class, 'show'])->name('categories.show');
Route::put('/categories/{id}', [CategoryController::class, 'update'])->name('categories.update');
Route::delete('/categories/{id}', [CategoryController::class, 'destroy'])->name('categories.destroy');

// // Admins only
// Route::delete('/orders/{orderId}', [OrderController::class, 'deleteOrder'])
//     ->name('orders.delete');


/**************************************** Users ************************************************/
Route::post('users/register', [UserController::class, 'register'])
    ->name('user.register');
/**************************************** Sellers ************************************************/

Route::post('sellers/register', [SellerController::class, 'register'])
    ->name('seller.register');

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

Route::group([
    'prefix' => 'admins',
    'middleware' => 'auth:admin'
], function () {
    Route::get('/', [AdminController::class, 'index']);
    Route::post('/add-admin', [AdminController::class, 'store']);
    Route::get('/{id}', [AdminController::class, 'show']);
    Route::put('/update-admin/{id}', [AdminController::class, 'update']);
    Route::delete('/delete-admin/{id}', [AdminController::class, 'destroy']);
});

/*
|--------------------------------------------------------------------------
| Auth Routes
|--------------------------------------------------------------------------
*/

// User Auth
Route::post('auth/user/login', [AuthUserController::class, 'login']);

Route::group([
    'middleware' => 'auth:user',
    'prefix' => 'auth/user'

], function ($router) {

    Route::post('logout', [AuthUserController::class, 'logout']);
    Route::post('refresh', [AuthUserController::class, 'refresh']);
    Route::post('me', [AuthUserController::class, 'me']);
});

// Admin Auth
Route::post('auth/admin/login', [AuthAdminController::class, 'login']);

Route::group([
    'middleware' => 'auth:admin',
    'prefix' => 'auth/admin'

], function ($router) {

    Route::post('logout', [AuthAdminController::class, 'logout']);
    Route::post('refresh', [AuthAdminController::class, 'refresh']);
    Route::post('me', [AuthAdminController::class, 'me']);
});

// Seller Auth
Route::post('auth/seller/login', [AuthSellerController::class, 'login']);
Route::group([
    'middleware' => 'auth:seller',
    'prefix' => 'auth/seller'

], function ($router) {

    Route::post('logout', [AuthSellerController::class, 'logout']);
    Route::post('refresh', [AuthSellerController::class, 'refresh']);
    Route::post('me', [AuthSellerController::class, 'me']);
});
/**************************************** ViewedProduts ************************************************/

// Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
// Route::get('/product/create', [ViewedProductsController::class, 'create'])->name('product.create');
// Route::post('/product', [ViewedProductsController::class, 'store'])->name('product.store');
// Route::get('/product/{id}', [ViewedProductsController::class, 'show'])->name('product.show');
// Route::put('/product/{id}', [ViewedProductsController::class, 'update'])->name('product.update');
// Route::delete('/product/{id}', [ViewedProductsController::class, 'destroy'])->name('product.destroy');

Route::post('products/view', [ViewedProductsController::class, 'storeviewProduct']);
Route::get('product/user-viewed/{userId}', [ViewedProductsController::class, 'getViewedProducts']);
/**************************************** verification  routes user ************************************************/

Route::get('user/verify/{verification_code}', [UserController::class, 'verifyUser']);

/**************************************** reset password routes for users  ************************************************/
Route::post('user/foreget', [UserController::class, 'resetPasswordLink'])->middleware('cors');
Route::get('user/resetPassword/{remember_token}', [UserController::class, 'reset'])->middleware('cors');
Route::post('user/userResetPassword/{remember_token}', [UserController::class, 'postResetPasswordLink'])->middleware('cors');

/**************************************** email varification for sellers  ************************************************/
Route::get('seller/verify/{verification_code}', [SellerController::class, 'verifySeller']);

/**************************************** reset password routes for sellers  ************************************************/
Route::post('seller/foreget', [SellerController::class, 'resetPasswordLink'])->middleware('cors');
Route::get('seller/resetPassword/{remember_token}', [SellerController::class, 'reset'])->middleware('cors');
Route::post('seller/sellerResetPassword/{remember_token}', [SellerController::class, 'postResetPasswordLink'])->middleware('cors');
/**************************************** search Routes  ************************************************/
// Route::post('search/product',[ProductController::class,'searchProduct']);
Route::get('search/product', [ProductController::class, 'searchProduct'])->name('products.search');

/*
|--------------------------------------------------------------------------
| Payment Routes
|--------------------------------------------------------------------------
*/


Route::post('/checkout', [StripeController::class, 'checkout'])->middleware('cors');
Route::get('/success', [StripeController::class, 'success'])->middleware('cors');
Route::get('/cancel', [StripeController::class, 'cancel'])->middleware('cors');
Route::post('/webhook', [StripeController::class, 'webhook'])->middleware('cors');
