<?php
/*
Basic json format
from and to front-end
{
    "review": {
        "title": "ahmed's2 title",
        "content": "ahmed's2 content",
        "rating": 2.2
    },
    "user" : {
        "id": 1 (can be NULL)
    },
    "product" : {
        "id": 1 (can be NULL)
    }
}

*/

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Review;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reviews = Review::all();
        // dd(response()->json($reviews));
        return response()->json($reviews);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($request)
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // get data
        $data = json_decode($request->getContent(), true);

        $validator = Validator::make($data['review'], [
            'title' => 'required|string|max:255',
            'content' => 'required',
            'rating' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(["message" => "error happend bad data bro..."]);
        } else {
            // create new review
            $review = Review::create([
                'writer' => '',
                'title' => $data['review']['title'],
                'content' => $data['review']['content'],
                'rating' => $data['review']['rating'],
            ]);
            // store the review
            // associate review with product , user
           
            $user = User::find($data['user']['id']);
            if (!$user) {
                return response()->json(["message" => "no user with this id"]);
            }
            $product = Product::find($data['review']['product_id']);
            if (!$product) {
                return response()->json(["message" => "no product with this id"]);
            }
            $review->product()->associate($product);
            $review->user()->associate($user);
            $review->writer = $review->user->username;
            $review->save();

            // calculate product rating
            $productReviews = $product->reviews;
            $reviewsCount = count($productReviews);
            $productRating = 0;
            foreach($productReviews as $rev ) {
                
                $productRating += $rev->rating / $reviewsCount ;
            }

            $product->rating = $productRating;

            $product->save();

            return response()->json(["message" => "added successfully"]);
        }
    }

    public function getProductReviews(Request $request) 
    {
        $productId = $request->input('prodId');
        // dd($productId);
        $reviews = Review::where('product_id' , $productId )->get();
        // dd($reviews);
        return response()->json($reviews);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // get data
        $data = json_decode($request->getContent(), true);

        $validator = Validator::make($data, [
            'title' => 'required|string|max:255',
            'content' => 'required',
            'rating' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(["message" => "error happend bad data bro..."]);
        } else {
            // create new review
            $review = Review::find($id);
            if ($review) {
                // store the review
                $review->update([
                    'title' => $data['review']['title'],
                    'content' => $data['review']['content'],
                    'rating' => $data['review']['rating'],
                ]);

                return response()->json(["message" => "updated successfully"]);
            } else {
                return response()->json(["message" => "error happend bad data bro..."]);
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $review = Review::find($id);
        if ($review) {
            // remove review
            $review->delete();
            return response()->json(["message" => "removed successfully"]);
        } else {
            return response()->json(["message" => "not deleted bro..."]);
        }
    }
}
