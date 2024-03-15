<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Cart extends Model
{
    protected $table = 'carts';

    use HasFactory;
    public function product(): HasMany
    {
        return $this->HasMany(product::class);
    }

    public function user(): HasOne
    {
        return $this->hasOne(user::class);
    }
}
