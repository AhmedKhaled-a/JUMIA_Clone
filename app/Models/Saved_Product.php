<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Saved_Product extends Model
{
    use HasFactory;

    public function user(): BelongsTo
    {
        return $this->belongsTo(user::class);
    }
    public function product(): HasMany
    {
        return $this->HasMany(product::class);
    }
}
