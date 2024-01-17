<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('exams', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('subject_id');
            $table->integer('point')->default(2);
            $table->string('question')->unique();
            $table->json('choice');
            $table->string('image')->nullable();
            $table->boolean('is_essay')->default(false);
            $table->string('actual_answer');

            // $table->string('subject');
            // $table->dateTime('exam_started');
            // $table->boolean('is_available')->default(true);
            // $table->dateTime('exam_ended');
            // $table->integer('exam_duration');
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exams');
    }
};