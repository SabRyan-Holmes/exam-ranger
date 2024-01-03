<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Exam;
class ExamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
           // Buat Data Soal Exam
        // Exam::factory(50)->create();
        Exam::factory(50)->create([
            'subject' => 'Subjek_1',
            
        ]);

        Exam::factory(40)->create([
            'subject' => 'Subjek_2',
        ]);

        Exam::factory(50)->create([
            'subject' => 'Subjek_3',
        ]);

       
    }
}