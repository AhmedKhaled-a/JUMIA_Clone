<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class Seller extends Authenticatable implements JWTSubject
{
    use HasFactory;
    public function products(): HasMany
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
        'id',
        'is_verified'
        
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

}
