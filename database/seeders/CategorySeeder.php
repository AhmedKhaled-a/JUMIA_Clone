<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;


class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $filename = storage_path('init_category.json');
        $f = fopen( $filename, 'r');
        // dd($f);
        // read json into an associative array products
        $categories = json_decode(fread($f ,  filesize($filename)) , true);
        // dd($categories);
        fclose($f);
        // dd($products);

        // dd(file_get_contents($products[0]['thumbnail']));
        // loop through products[]
        foreach($categories as $category) {
            $thumbnail = file_get_contents($category['category_thumb']);
            $splitted = explode( '.', $category['category_thumb']);
            $thumbnail_path = 'products/' . (Str::random(18) . "." . $splitted[ sizeof($splitted) - 1 ]);
            Storage::disk('public')->put($thumbnail_path, $thumbnail);

            $createdCat = Category::create([
                'id' => $category['id'],
                'name' => $category['name'],
                'category_thumb' => $thumbnail_path
            ]);
            if($category['super_category_id']) {
                $parent = Category::find($category['super_category_id']);
                $createdCat->super_category()->associate($parent);
            }
            $createdCat->save();
        }
    }
}
