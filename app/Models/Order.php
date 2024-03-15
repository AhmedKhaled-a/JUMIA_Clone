<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory;
    
    public function product(): HasMany
    {
        return $this->HasMany(Product::class);
    }

    public function user(): HasOne
    {
        return $this->hasOne(user::class);
    }
    protected $fillable = [
        'count',
        'price',
        'shipping_period',
        'shipping_cost',
        'user_id',
        'product_id',
        'id'
        
    ];
}
