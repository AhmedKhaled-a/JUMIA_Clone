<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'fullname',
        'email',
        'password',
        'gender',
        'username',
        'phone_number',
        'address_country',
        'address_city',
        'address_district',
        
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function carts(): HasMany
    {
        return $this->HasMany(Cart::class);
    }

    public function orders(): HasMany
    {
        return $this->HasMany(Order::class);
    }

    public function review(): HasMany
    {
        return $this->HasMany(Review::class);
    }

    public function saved_products(): BelongsToMany
    {
        return $this->BelongsToMany(
            Product::class,
            'saved_products',
        );
    }
    public function viewed_product(): HasMany
    {
        return $this->HasMany(Viewed_Product::class);
    }
}
