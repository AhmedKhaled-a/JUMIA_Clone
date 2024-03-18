<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Viewed_Product extends Model
{
    use HasFactory;
    public function user(): BelongsTo
    {
        return $this->BelongsTo(User::class);
    }
    public function product(): BelongsTo
    {
        return $this->BelongsTo(Product::class);
    }
    protected $table='viewed_products';
    
    protected $fillable = [
        
        'product_id',
        'user_id',
        'viewed_it'
        
    ];
}
