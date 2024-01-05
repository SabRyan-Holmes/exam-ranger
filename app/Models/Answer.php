<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



class Answer extends Model
{
    use HasFactory;
    
    protected $guarded = [
        'id',
    ];

    // Choice jadi array
    protected $casts = [
        'answer' => 'array'
    ];

    public function student(): HasOne 
    {
        return $this->hasOne(User::class);
    }

    public function exam_subject(): HasOne 
    {
        return $this->hasOne(Exam::class, 'exam_subject');
    }



}