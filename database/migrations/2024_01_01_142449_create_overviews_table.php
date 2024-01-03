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
        Schema::create('overviews', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('student_id');
            $table->foreignId('exam_id');
            $table->boolean('is_correct');
            $table->double('mark')->nullable();
            $table->double('average_mark')->nullable();
            $table->double('final_mark')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('overviews');
    }
};