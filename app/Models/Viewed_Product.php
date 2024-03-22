<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Viewed_Product extends Model
{
    use HasFactory;
    protected $table='viewed_products';

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
        'viewed_at'
        
    ];
}
