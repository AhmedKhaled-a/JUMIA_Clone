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
            'id' => $this->id,
            'count' => $this->count,
            'product' => $this->product 
        ];
    }
}