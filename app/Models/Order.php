<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    use HasFactory;
    
    public function product(): BelongsTo
    {
        return $this->BelongsTo(Product::class);
    }

    public function user(): BelongsTo
    {
        return $this->BelongsTo(User::class);
    }

    public function seller(): BelongsTo
    {
        return $this->BelongsTo(Seller::class);
    }
    protected $fillable = [
        'count',
        'price',
        'shipping_period',
        'shipping_cost',
        'user_id',
        'product_id',
        'order_status'        
    ];
}
