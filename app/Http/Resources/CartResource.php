<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Controllers\CartController;
use Illuminate\Http\Resources\Json\JsonResource;

class CartResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'cart_id' => $this->id,
            'user_id' => $this->user_id,
            'product_id' => $this->product_id,
            'count' => $this->count,
            'price' => $this->price,
            'totalPrice' => $this->count * $this->price,
        ];
    }
}