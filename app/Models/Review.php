<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Review extends Model
{
    use HasFactory;
    public function product(): HasOne
    {
        return $this->hasOne(product::class);
    }
    public function user(): HasOne
    {
        return $this->hasOne(user::class);
    }
    protected $fillable = [
        'writer',
        'title',
        'product_id',
        'user_id',
        'content',
        'rating',
        'id'
        
        
    ];
}
