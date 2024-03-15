<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Review extends Model
{
    use HasFactory;
    protected $fillable = [
        'writer',
        'title',
        'content',
        'rating',
    ];
    public function product(): BelongsTo
    {
        return $this->BelongsTo(product::class);
    }
    public function user(): BelongsTo
    {
        return $this->BelongsTo(user::class);
    }
}
