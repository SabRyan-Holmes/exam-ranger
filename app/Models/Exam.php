<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Exam extends Model
{
    use HasFactory;
    
    protected $guarded = [
        'id',
    ];
 
    // Choice jadi array
    protected $casts = [
        'choice' => 'array'
    ];

    // public function isEnded() {
    //     if ($this->exam_ended > )
    // }

    public function getCorrectAnswerPoints()
    {
    return $this->point;
    }

    public function scopeNonEssay($query)
    {
    return $query->where('is_essay', false);
    }
    
}