<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Admin extends Model
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
