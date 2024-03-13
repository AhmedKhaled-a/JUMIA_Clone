<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;
    public function seller(): BelongsTo
    {
        return $this->belongsTo(seller::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(category::class);
    }

    public function images(): HasMany
    {
        return $this->HasMany(Product_Image::class);
    }

    public function cart(): BelongsTo
    {
        return $this->belongsTo(cart::class);
    }
    public function order(): BelongsTo
    {
        return $this->belongsTo(order::class);
    }
    public function review(): HasMany
    {
        return $this->HasMany(review::class);
    }
    public function saved_product(): BelongsTo
    {
        return $this->belongsTo(saved_product::class);
    }
    public function viewd_product(): BelongsTo
    {
        return $this->belongsTo(Viewed_Product::class);
    }

    protected $fillable = [
        'id',
        'title',
        'desc',
        'spec',
        'price',
        'discount',
        'brand',
        'stock',
        'rating',
        'thumbnail',
        'category_id',
        'seller_id',
    ];
}
