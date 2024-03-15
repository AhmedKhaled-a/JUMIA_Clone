<?php

namespace App\Console\Commands;

use App\Models\Product;
use App\Models\Product_Image;
use Illuminate\Support\Facades\Storage;

use Illuminate\Console\Command;
use Illuminate\Support\Str;




class PopulateInitProducts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:populate-init-products';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This command takes initial data from json initial_data.json and populates DB';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $filename = storage_path('initial_data.json');
        $f = fopen( $filename, 'r');
        // dd($f);
        // read json into an associative array products
        $products = json_decode(fread($f ,  filesize($filename)) , true)['products'];
        fclose($f);
        // dd($products);

        // dd(file_get_contents($products[0]['thumbnail']));
        // loop through products[]
        foreach($products as $product) {
            $thumbnail = file_get_contents($product['thumbnail']);
            $splitted = explode( '.', $product['thumbnail']);
            $thumbnail_path = 'products/' . (Str::random(18) . "." . $splitted[ sizeof($splitted) - 1 ]);
            Storage::disk('public')->put($thumbnail_path, $thumbnail);

            $createdProduct = Product::create([
                'title' => $product['title'],
                'desc' => $product['description'],
                'spec' => '',
                'price' => $product['price'],
                'discount' => $product['discountPercentage'],
                'stock' => $product['stock'],
                'brand' => $product['brand'],
                'rating' => 0,
                'thumbnail' => $thumbnail_path,
                'seller_id' => 1
            ]);

            // loop through images[]
            foreach($product['images'] as $image) {
                // download images and store them in public storage + associate image with product
                $img = file_get_contents($image);
                $splitted = explode( '.', $image);
                $image_name = Str::random(18) . "." . $splitted[ sizeof($splitted) - 1 ];
                // dd(storage_path($image_name));
                $imagePath = 'products/' . $image_name;
                Storage::disk('public')->put($imagePath, $img);
                $productImage = new Product_Image();
                $productImage->product_id = $createdProduct->id;
                $productImage->image = $imagePath;

                // $postImage->save();
                $createdProduct->images()->save($productImage);
            }
            // store product
        }
    }
}
