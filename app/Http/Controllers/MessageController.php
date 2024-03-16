<?php
/*
Basic json format
from and to front-end
{
    "message": {
        "title": "ahmed's2 title",
        "content": "ahmed's2 content",
    },
    "user" : {
        "id": 1 (can be NULL)
    },
}
*/

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Product;
use App\Models\Review;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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

        $validator = Validator::make($data['message'], [
            'title' => 'required|string|max:255',
            'content' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(["message" => "error happend bad data bro..."]);
        } else {
            // create new review
            $msg = Message::create([
                'writer' => '',
                'title' => $data['message']['title'],
                'content' => $data['message']['content'],
            ]);
            // store the review
            // associate review with product , user
            $user = User::find($data['user']['id']);
            if (!$user) {
                return response()->json(["message" => "No user with this id"]);
            }
            $msg->user()->associate($user);
            $msg->writer = $msg->user->username;
            $msg->save();

            return response()->json(["message" => "added successfully"]);
        }
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
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    { 
        {
            // get data
            $data = json_decode($request->getContent(), true);

            $validator = Validator::make($data['message'], [
                'title' => 'required|string|max:255',
                'content' => 'required',
            ]);
            if ($validator->fails()) {
                return response()->json(["message" => "error happend bad data bro..."]);
            } else {
                // get message by id
                $msg = Message::find($id);
                if ($msg) {
                    // update the message
                    $msg->update([
                        'title' => $data['message']['title'],
                        'content' => $data['message']['content'],
                    ]);

                    return response()->json(["message" => "updated successfully"]);
                } else {
                    return response()->json(["message" => "error happend bad data bro..."]);
                }
            }
            //
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $msg = Message::find($id);
        if ($msg) {
            // remove message
            $msg->delete();
            return response()->json(["message" => "removed successfully"]);
        } else {
            return response()->json(["message" => "message not found"]);
        }
        //
    }
}
