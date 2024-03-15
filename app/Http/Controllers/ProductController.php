<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Product_Image;
use Dotenv\Validator;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::paginate(10);

        if ($products->count() > 0) {
            foreach ($products as $product) {
                $product->images = $product->images()->pluck('image');
            }
            return response()->json($products, 200);
        } else {
            return response()->json(['message' => 'No products found'], 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string',
            'desc' => 'required|string',
            'spec' => 'required|string',
            'price' => 'required|numeric|min:0',
            'discount' => 'nullable|numeric|min:0|max:100',
            'brand' => 'required|string|max:255',
            'stock' => 'required|integer|min:0',
            'rating' => 'nullable|numeric|min:0|max:5',
            'thumbnail' => 'required|string',
            'category_id' => 'nullable|exists:categories,id',
            'seller_id' => 'nullable|exists:sellers,id',
            'images' => 'required|array|min:1',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $product = Product::create($validatedData);

        // if ($request->hasFile('images')) {
        //     foreach ($request->file('images') as $image) {
        //         $ext = $image->getClientOriginalExtension();
        //         $imageName = time().'_'.$image->getClientOriginalName(). '.'.$ext;
        //         $productImage = new Product_Image(['image' => 'images/' . $imageName]);
        //         $product->images()->save($productImage);

        //         // Create a new product image record
        //         $product->images()->create([
        //             'image' => 'images/' . $imageName,
        //         ]);
        //     }
        // } else {
        //     return response()->json(['message' => 'At least one image is required for the product'], 422);
        // }

        return response()->json('Product Added Successfully', 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = Product::find($id);
        if ($product) {
            $product->images = $product->images()->pluck('image');
            return response()->json($product, 200);
        } else {
            return response()->json(['message' => 'Product not found'], 404);
        }
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
