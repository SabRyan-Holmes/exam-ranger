<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Overview extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function student(): HasOne 
    {
        return $this->hasOne(User::class);
    }


    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function answered()
    {
        return $this->belongsTo(Answer::class, 'answer_id');
    }
}