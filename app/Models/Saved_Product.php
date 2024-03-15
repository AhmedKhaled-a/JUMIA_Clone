<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Saved_Product extends Model
{
    use HasFactory;
    protected $table = 'saved_products';
    public function user(): BelongsTo
    {
        return $this->BelongsTo(User::class);
    }
    public function product(): BelongsTo
    {
        return $this->BelongsTo(Product::class);
    }
    protected $fillable = [
        'product_id',
        'user_id',
    ];
}
