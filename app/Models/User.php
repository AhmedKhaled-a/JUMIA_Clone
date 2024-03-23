<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;


    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
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
        'role_id',
        'is_verified'

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
    public function viewed_products():HasMany
    {
        // return $this->hasMany(Viewed_Product::class, 'user_id');
        return $this->hasMany(
            Product::class,
            'viewed_products',
            'user_id',
            'product_id',
        );
    }


    public function role(): BelongsTo
    {
        return $this->BelongsTo(Role::class, 'role_id');
    }

    public function isSuperAdmin()
    {
        $superAdminRoleId = Role::where('name', 'super_admin')->value('id');
        return $this->role_id === $superAdminRoleId;
    }
}

