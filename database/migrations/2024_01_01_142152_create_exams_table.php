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
            $table->string('question')->unique();
            $table->json('choice');
            $table->string('image')->nullable();
            $table->boolean('is_essay')->default(false);
            $table->boolean('is_ative')->default(false);
            $table->string('actual_answer');
            
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