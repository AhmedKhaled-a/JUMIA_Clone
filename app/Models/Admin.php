<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Admin extends Authenticatable implements JWTSubject
{
    use HasFactory;
    public function super_admin(): BelongsTo
    {
        return $this->belongsTo(Admin::class);
    }

    protected $fillable = [
        'username',
        'id',
        'password',
        'email',
        'super_admin_id',
        
    ];
}
