<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product_Image extends Model
{
    protected $table = 'product_images';
    use HasFactory;
    public function product(): BelongsTo
    {
        return $this->belongsTo(product::class);
    }

    protected $fillable = [
        'name',
        'id',
        'image',
        'product_id'
    ];

}
