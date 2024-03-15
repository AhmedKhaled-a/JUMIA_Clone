<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
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

    public function cart(): HasOne
    {
        return $this->hasOne(cart::class);
    }

    public function order(): HasMany
    {
        return $this->HasMany(order::class);
    }

    public function review(): HasMany
    {
        return $this->HasMany(review::class);
    }

    public function saved_product(): HasMany
    {
        return $this->HasMany(saved_product::class);
    }
    public function viewed_product(): HasMany
    {
        return $this->HasMany(viewed_product::class);
    }
}
