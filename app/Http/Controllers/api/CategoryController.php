<?php

namespace App\Http\Controllers\api;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\categoryResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{

    public function index(Request $request)
    {
        // Retrieve super category ID from the query string
        $id = $request->input('id');

        if (!is_null($id)) {
            // Fetch categories based on super category ID if provided
            $superCategory = Category::find($id);
            if (!$superCategory) {
                return response()->json(['message' => 'category not found'], 404);
            }
            $categories = $superCategory->subCategories;
            return response()->json($categories, 200);
        }
        else {
            // dd(Category::whereNull('super_category_id'));
            return response()->json(Category::whereNull('super_category_id')->get(), 200);
        }
    }

    public function show(string $id)
    {
        $category = category::find($id);

        if ($category) {
            if ($category->thumbnail && file_exists(public_path($category->thumbnail))) {
                $thumbnailPath = public_path($category->thumbnail);
                $thumbnailData = file_get_contents($thumbnailPath);
                $category->thumbnail = base64_encode($thumbnailData);
                return response()->json(new categoryResource($category));
            } else {
                return response()->json(["message" => "No category with this id"]);
            }
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request['category'], [
            'name' => 'required|string|max:255',
            'id' => 'required',

        ]);

        // dd($validator);
        if ($validator->fails()) {
            return response()->json(["message" => "error happend bad data bro..."]);
        } else {
            // dd($request['category']['id']);
            $category = new Category();
            $thumbnailPath = null;
            // $brbr=$request->has('category');
            // dd($brbr);


            $thumbnailData = $request['category']['category_thumb'];
            $ext = explode('/', mime_content_type($thumbnailData))[1];
            $thumbnailData = explode(',', $thumbnailData)[1];
            // $ext = 'jpg';

            $thumbnailData = base64_decode($thumbnailData); // Decode base64 data
            // dd($thumbnailData);
            $thumbnailName = Str::random(20) . "." . $ext; // Generate a random name for the thumbnail
            // dd($thumbnailName);
            $thumbnailPath = 'categories/' . $thumbnailName;
            // dd( $thumbnailPath);
            Storage::disk('public')->put($thumbnailPath, $thumbnailData); // save thumbnail
            $category->category_thumb = $thumbnailPath;
            // dd( $thumbnailPath);

            $category->id = $request['category']['id'];
            $category->name = $request['category']['name'];
            // $category->super_category_id = $request['category']['super_category_id'];
            $super_category = Category::find($request['category']['super_category_id']);
            $category->super_category()->associate($super_category);

            $category->save();
        }





        return response()->json(["message" => "added successfully"]);
    }


    public function update(Request $request, String $id)
    {
        $data = json_decode($request->getContent(), true);
        // dd($data);
        $validator = Validator::make($data['category'], [
            'name' => 'required|string|max:255',


        ]);
        if ($validator->fails()) {
            return response()->json(["message" => "error happend bad data bro..."]);
        } else {
            $category = Category::find($id);
            if ($request->has('category_thumb')) {
                $thumbnailData = base64_decode($request->input('category_thumb'));
                $ext = explode('/', mime_content_type($thumbnailData))[1];
                $thumbnailData = explode(',', $thumbnailData)[1];

                $thumbnailName = Str::random(20) . "." . $ext; // Generate a random name for the thumbnail
                $thumbnailPath = 'categories/' . $thumbnailName;
                // dd( $thumbnailPath);
                Storage::disk('public')->put($thumbnailPath, $thumbnailData); // save thumbnail

                // Delete the existing thumbnail if it exists
                if ($category->category_thumb  && File::exists(public_path($category->category_thumb))) {
                    File::delete(public_path($category->category_thumb));
                }

                $category->category_thumb = $thumbnailPath;
            }


            if ($category) {
                $category->update([
                    'name' => $data['category']['name'],
                    'category_thumb' => $data['category']['category_thumb'],
                    'super_category_id' => $data['category']['super_category_id']
                ]);
                return response()->json(["message" => "updated successfully"]);
            } else {
                return response()->json(["message" => "error happend bad data bro..."]);
            }
        }
    }
    public function destroy(string $id)
    {
        $category = category::find($id);
        if ($category) {
            if (File::exists(public_path($category->thumbnail))) {
                File::delete(public_path($category->thumbnail));
            }

            $category->delete();
            return response()->json(["message" => "removed successfully"]);
        } else {
            return response()->json(["message" => "not deleted bro..."]);
        }
    }
}
