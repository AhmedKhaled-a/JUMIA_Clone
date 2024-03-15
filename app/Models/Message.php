<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Message extends Model
{
    use HasFactory;
    public function user(): HasOne
    {
        return $this->hasOne(user::class);
    }
    protected $fillable = [
        'writer',
        'title',
        'content',        
    ];
}
