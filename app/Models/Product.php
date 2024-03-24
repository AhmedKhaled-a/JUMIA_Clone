<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Seller;
use App\Models\Category;
use App\Models\Review;
use App\Models\Order;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Product extends Model
{
    use HasFactory;
    public function seller(): BelongsTo
    {
        return $this->belongsTo(Seller::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function images(): HasMany
    {
        return $this->HasMany(Product_Image::class);
    }

    public function cart(): HasMany
    {
        return $this->hasMany(Cart::class);
    }
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
    public function reviews(): HasMany
    {
        return $this->HasMany(Review::class);
    }

    public function users_saved(): BelongsToMany
    {
        return $this->BelongsToMany(
            User::class,
            'saved_products'
        ); 
    }
    public function users_viewed(): BelongsToMany
    {
        return $this->BelongsToMany(
            User::class,
            'viewed_products', 
            'product_id',
            'user_id',    
        );
    }

    protected $fillable = [
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
