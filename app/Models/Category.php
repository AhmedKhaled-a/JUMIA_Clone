<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;
    public function super_category(): BelongsTo
    {
        return $this->belongsTo(Category::class);

    }
     public function subCategories(): HasMany
    {
        return $this->hasMany(Category::class, 'super_category_id');
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class , 'category_id');
    }

    protected $fillable = [
        'name',
        'id',
        'category_thumb',
        'super_category_id'
    ];
}
