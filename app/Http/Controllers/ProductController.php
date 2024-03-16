<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Product_Image;
// use Dotenv\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    /**
     * Retrieve a paginated list of products with encoded thumbnails and images.
     *
     * This function retrieves a paginated list of products, encodes the thumbnails and images of each product into base64 format,
     * and returns the products as a JSON response.
     *  
     * @return \Illuminate\Http\JsonResponse JSON response with the list of products including encoded thumbnails and images.
     */
    public function index()
    {
        $products = Product::all();

        if ($products->count() > 0) {
            foreach ($products as $product) {
                // Retrieve and encode thumbnail
                if ($product->thumbnail && file_exists(public_path($product->thumbnail))) {
                    $thumbnailPath = $product->thumbnail;
                    $product->thumbnail = $thumbnailPath;
                }

                // Retrieve and encode images
                $productImages = $product->images()->pluck('image');
                foreach ($productImages as $key => $imagePath) {
                    if (file_exists(public_path($imagePath))) {
                        $imageData = $imagePath;
                        $productImages[$key] = $imageData;
                    } else {
                        unset($productImages[$key]); // Remove non-existent image path
                    }
                }
                $product->images = $productImages;
            }
            return response()->json($products, 200);
        } else {
            return response()->json(['message' => 'No products found'], 404);
        }
    }


    /**
     * Store a new product in the database.
     *
     * This function validates the incoming request data, creates a new product instance, saves it to the database,
     * and handles the storage of product thumbnail and images in base64 format.
     *
     * @param \Illuminate\Http\Request $request The incoming HTTP request containing the product data.
     *
     * @return \Illuminate\Http\JsonResponse JSON response indicating the success or failure of the product creation.
     */
    public function store(Request $request)
    {

        $ValidatedData = Validator::make($request->all(), [
            'title' => 'required|string',
            'desc' => 'required|string',
            'spec' => 'required|string',
            'price' => 'required|numeric|min:0',
            'discount' => 'nullable|numeric|min:0|max:100',
            'brand' => 'required|string|max:255',
            'stock' => 'required|integer|min:0',
            'rating' => 'nullable|numeric|min:0|max:5',
            'thumbnail' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'seller_id' => 'required|exists:sellers,id',
            'images' => 'required|array|min:1',
            'images.*' => 'string',
        ]);

        if ($ValidatedData->fails()) {
            return response()->json($ValidatedData->errors(), 400);
        }

        $product = new Product();

        $product->title = $request['title'];
        $product->desc = $request['desc'];
        $product->spec = $request['spec'];
        $product->price = $request['price'];
        $product->discount = $request['discount'];
        $product->brand = $request['brand'];
        $product->stock = $request['stock'];
        $product->rating = $request['rating'];
        // $product->thumbnail = $request['thumbnail'];
        $product->category_id = $request['category_id'];
        $product->seller_id = $request['seller_id'];
        $product->category()->associate($request['category_id']);
        $product->seller()->associate($request['seller_id']);

        // if($request->hasFile('thumbnail')) {
        //     $path = 'assets/uploads/product/'. $product->thumbnail;
        //     $file = $request->file('thumbnail');
        //     $filename = time() . '.' . $file->getClientOriginalExtension();
        //     $file->move(public_path($path), $filename);
        //     $product->thumbnail = $path . $filename;
        // }
        $thumbnailPath = null;
        if ($request->has('thumbnail')) {
            $thumbnailData = $request->input('thumbnail');
            $thumbnailData = base64_decode($thumbnailData); // Decode base64 data
            $thumbnailName = Str::random(20) . '.png'; // Generate a random name for the thumbnail
            $thumbnailPath = 'assets/uploads/product/' . $thumbnailName;
            file_put_contents(public_path($thumbnailPath), $thumbnailData); // Save the thumbnail
            $product->thumbnail = $thumbnailPath;
        }

        $product->save(); // saving the product first to get the id

        // if ($request->hasFile('images')) {
        //     foreach ($request->file('images') as $image) {
        //         $imageFileName = time() . '_' . $image->getClientOriginalName();
        //         $imagePath = 'assets/uploads/product/' . $imageFileName;
        //         $image->move(public_path('assets/uploads/product'), $imageFileName);

        //         // Create a record in the product_images table
        //         $productImage = new Product_Image();
        //         $productImage->product_id = $product->id;
        //         $productImage->image = $imagePath;
        //         $product->images()->save($productImage);
        //     }
        // }

        if ($request->has('images')) {
            foreach ($request->input('images') as $imageData) {
                $imageData = base64_decode($imageData); // Decode base64 data
                $imageName = Str::random(20) . '.png'; // Generate a random name for the image
                $imagePath = 'assets/uploads/product/' . $imageName;
                file_put_contents(public_path($imagePath), $imageData); // Save the image
                // Create a record in the product_images table
                $productImage = new Product_Image();
                $productImage->product_id = $product->id;
                $productImage->image = $imagePath;
                $productImage->save();
            }
        }

        return response()->json('Product Added Successfully', 201);
    }

    /**
     * Display the specified product.
     *
     * This function retrieves a product from the database by its ID, encodes the thumbnail and images to base64 format,
     * and returns the product details in a JSON response.
     *
     * @param string $id The ID of the product to be displayed.
     *
     * @return \Illuminate\Http\JsonResponse JSON response containing the product details, or an error message if the product is not found.
     */
    public function show(string $id)
    {
        $product = Product::find($id);

        if ($product) {
            // Retrieve and encode thumbnail
            if ($product->thumbnail && file_exists(public_path($product->thumbnail))) {
                $thumbnailPath = public_path($product->thumbnail);
                $thumbnailData = file_get_contents($thumbnailPath);
                $product->thumbnail = base64_encode($thumbnailData);
            }

            // Retrieve and encode images
            $productImages = $product->images()->pluck('image');
            foreach ($productImages as $key => $imagePath) {
                if (file_exists(public_path($imagePath))) {
                    $imageData = file_get_contents(public_path($imagePath));
                    $productImages[$key] = base64_encode($imageData);
                } else {
                    unset($productImages[$key]); // Remove non-existent image path
                }
            }
            $product->images = $productImages;

            return response()->json($product, 200);
        } else {
            return response()->json(['message' => 'Product not found'], 404);
        }
    }

    /**
     * Update a product in the database.
     *
     * This function validates the incoming request data, updates the product details, processes the thumbnail and images,
     * and returns a JSON response indicating the success or failure of the update operation.
     *
     * @param Request $request The HTTP request object containing the updated product data.
     * @param mixed $id The ID of the product to be updated.
     *
     * @return \Illuminate\Http\JsonResponse JSON response indicating the success or failure of the update operation.
     */
    public function update(Request $request, $id)
    {
        $validatedData = Validator::make($request->all(), [
            'title' => 'string',
            'desc' => 'string',
            'spec' => 'string',
            'price' => 'numeric|min:0',
            'discount' => 'nullable|numeric|min:0|max:100',
            'brand' => 'string|max:255',
            'stock' => 'integer|min:0',
            'rating' => 'nullable|numeric|min:0|max:5',
            'thumbnail' => 'string',
            'category_id' => 'exists:categories,id',
            'seller_id' => 'exists:sellers,id',
            'images' => 'array',
            'images.*' => 'string',
        ]);

        if ($validatedData->fails()) {
            return response()->json($validatedData->errors(), 400);
        }

        $product = Product::find($id);
        if (!$product) {
            return response()->json('Product not found', 404);
        }

        // Process thumbnail
        if ($request->has('thumbnail')) {
            $thumbnailData = base64_decode($request->input('thumbnail'));
            $thumbnailName = Str::random(20) . '.png'; // Generate a random name for the thumbnail
            $thumbnailPath = 'assets/uploads/product/' . $thumbnailName;
            file_put_contents(public_path($thumbnailPath), $thumbnailData);

            // Delete the existing thumbnail if it exists
            if ($product->thumbnail && File::exists(public_path($product->thumbnail))) {
                File::delete(public_path($product->thumbnail));
            }

            $product->thumbnail = $thumbnailPath;
        }

        // Update other product fields
        $product->fill($request->only([
            'title', 'desc', 'spec', 'price', 'discount', 'brand', 'stock', 'rating', 'category_id', 'seller_id'
        ]));
        $product->save();

        // Process images
        if ($request->has('images')) {
            foreach ($product->images as $productImage) {
                $imagePath = public_path($productImage->image);
                if (File::exists($imagePath)) {
                    File::delete($imagePath);
                }
            }

            $product->images()->delete();

            foreach ($request->input('images') as $imageData) {
                $imageData = base64_decode($imageData); // Decode base64 data
                $imageName = Str::random(20) . '.png'; // Generate a random name for the image
                $imagePath = 'assets/uploads/product/' . $imageName;
                file_put_contents(public_path($imagePath), $imageData); // Save the image

                // Create a record in the product_images table
                $productImage = new Product_Image();
                $productImage->product_id = $product->id;
                $productImage->image = $imagePath;
                $productImage->save();
            }
        }

        return response()->json('Product updated successfully', 200);
    }



    /**
     * Delete a product from the database.
     *
     * This function finds the product by its ID, deletes its associated images, deletes the product itself,
     * and returns a JSON response indicating the success or failure of the deletion operation.
     *
     * @param string $id The ID of the product to be deleted.
     *
     * @return \Illuminate\Http\JsonResponse JSON response indicating the success or failure of the deletion operation.
     */
    // public function destroy(string $id)
    // {
    //     $product = Product::find($id);
    //     if ($product) {
    //         $product->images()->delete();
    //         $product->delete();
    //         return response()->json('Product deleted successfully', 200);
    //     } else {
    //         return response()->json('Product not found', 404);
    //     }
    // }

    public function destroy(string $id)
    {
        $product = Product::find($id);
        if ($product) {

            // Delete the thumbnail
            if (File::exists(public_path($product->thumbnail))) {
                File::delete(public_path($product->thumbnail));
            }

            // Delete images from storage
            foreach ($product->images as $productImage) {
                $imagePath = public_path($productImage->image);
                if (File::exists($imagePath)) {
                    File::delete($imagePath);
                }
            }

            // Delete product record
            $product->images()->delete();
            $product->delete();

            return response()->json('Product deleted successfully', 200);
        } else {
            return response()->json('Product not found', 404);
        }
    }
}
