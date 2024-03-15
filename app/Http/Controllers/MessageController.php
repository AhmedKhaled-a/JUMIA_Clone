<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $mssgs = Message::all();
        return response()->json($mssgs);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
            $product = Product::find($data['product']['id']);
            $review->product()->associate($product);
            $review->user()->associate($user);
            $review->writer = $review->user->username;
            $review->save();

            return response()->json(["message" => "added successfully"]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
