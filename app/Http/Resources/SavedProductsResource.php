<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class SavedProductsResource extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->product_id,
            'title' => $this->title,
            'desc' => $this->desc,
            'spec' => $this->spec,
            'price' => $this->price,
            'discount' => $this->discount,
            'brand' => $this->brand,
            'stock' => $this->stock,
            'rating' => $this->rating,
            'thumbnail' => $this->thumbnail,
            'category_id' => $this->category_id,
            'seller_id' => $this->seller_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
