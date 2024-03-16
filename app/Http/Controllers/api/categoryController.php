<?php

namespace App\Http\Controllers\api;

use App\Models\User;
use App\Models\category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\categoryResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use PhpParser\Node\Expr\Cast\String_;

class categoryController extends Controller
{
    public function index()
    {
        $categories = category::all();
        if ($categories->count() > 0) {
            foreach ($categories as $category) {
                // Retrieve and encode thumbnail
                if ($category->category_thumb && file_exists(public_path($category->category_thumb))) {
                    $thumbnailPath = $category->category_thumb;
                    $category->category_thumb= $thumbnailPath;
                
                return response()->json($categories, 200);
            } else {
                return response()->json(['message' => 'No categories found'], 404);
            };
            }

        }
    }
    public function show(string $id){
        $category=category::find($id);
        

        
        if ($category){
            if ($category->thumbnail && file_exists(public_path($category->thumbnail))) {
                $thumbnailPath = public_path($category->thumbnail);
                $thumbnailData = file_get_contents($thumbnailPath);
                $category->thumbnail = base64_encode($thumbnailData);
            return response()->json(new categoryResource( $category));
        }
        else {
            return response()->json(["message" => "No category with this id"]);
        }
        
    }
    }
    public function store(Request $request)
    {
        // dd($request['category']['id']);
        
        // $data = json_decode($request->getContent(), true);
        // dd($data['category']['id']);
        $validator = Validator::make($request['category'], [
            'name' => 'required|string|max:255',
            'id'=>'required',
            
        ]);

        // dd($validator);
        if ($validator->fails()) {
            return response()->json(["message" => "error happend bad data bro..."]);
        } else{
            // dd($request['category']['id']);
            $category= new Category();
            $thumbnailPath = null;
            // $brbr=$request->has('category');
            // dd($brbr);
            
                
                $thumbnailData = $request['category']['category_thumb'];
                
                $thumbnailData = base64_decode($thumbnailData); // Decode base64 data
                // dd($thumbnailData);
                $thumbnailName = Str::random(20) . '.png'; // Generate a random name for the thumbnail
                // dd($thumbnailName);
                $thumbnailPath = 'assets/uploads/categoeies/' . $thumbnailName;
                // dd( $thumbnailPath);
                file_put_contents(public_path($thumbnailPath), $thumbnailData); // Save the thumbnail
                $category->category_thumb = $thumbnailPath;
                // dd( $thumbnailPath);
            
                 $category->id= $request['category']['id'];
                 $category->name=$request['category']['name'];
            // $category->category_thumb=$request['category']['category_thumb'];
                 $category->super_category_id=$request['category']['super_category_id'];
                 $super_category=Category::find($request['category']['super_category_id']);
                 $category->super_category()->associate($super_category);
           
                $category->save();
        }
       

        
           

            return response()->json(["message" => "added successfully"]);
           
    }


    public function update(Request $request,String $id){
        $data = json_decode($request->getContent(), true);
        // dd($data);
        $validator = Validator::make($data['category'], [
            'name' => 'required|string|max:255',
            
            
        ]);
        if ($validator->fails()) {
            return response()->json(["message" => "error happend bad data bro..."]);
        } else{
            $category = Category::find($id);
            if ($request->has('category_thumb')) {
                $thumbnailData = base64_decode($request->input('category_thumb'));
                $thumbnailName = Str::random(20) . '.png'; // Generate a random name for the thumbnail
                $thumbnailPath = 'assets/uploads/product/' . $thumbnailName;
                file_put_contents(public_path($thumbnailPath), $thumbnailData);
    
                // Delete the existing thumbnail if it exists
                if ($category->category_thumb  && File::exists(public_path($category->category_thumb ))) {
                    File::delete(public_path($category->category_thumb ));
                }
    
                $category->category_thumb= $thumbnailPath;
            }
    
            
            if ($category){
                $category->update([
                    'name'=>$data['category']['name'],
                    'category_thumb'=>$data['category']['category_thumb'],
                    'super_category_id'=>$data['category']['super_category_id']
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
