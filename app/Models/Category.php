<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    use HasFactory;
    public function super_category(): BelongsTo
    {
        return $this->belongsTo(category::class);
    }

    protected $fillable = [
        'name',
        'id',
        'category_thumb',
        'super_category_id'
        
    ];
}
