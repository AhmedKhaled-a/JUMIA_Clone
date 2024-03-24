<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Admin extends Authenticatable implements JWTSubject
{
    use HasFactory;
    public function super_admin(): BelongsTo
    {
        return $this->BelongsTo(Admin::class);
    }

    protected $fillable = [
        'username',
        'password',
        'email',
        'super_admin_id',
    ];

    protected $hidden = [
        'password'
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
