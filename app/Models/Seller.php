<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Seller extends Model
{
    use HasFactory;
    public function product(): HasMany
    {
        return $this->HasMany(Product::class);
    }

    public function orders(): HasMany
    {
        return $this->HasMany(Order::class);
    }
    protected $fillable = [
        'fullname',
        'email',
        'password',
        'shop_name',
        'phone_number',
        'confirmer_id',
        'id'
        
    ];

}
