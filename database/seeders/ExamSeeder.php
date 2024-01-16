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
<<<<<<< HEAD
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
=======
        Exam::factory(50)->create([
            'subject' => "Subject_1",
            'exam_started' => "2024-01-04 08:00:00",
            'exam_ended' => "2024-01-15 23:00:00",
            'exam_duration' => 120,

        ]);

        Exam::factory(40)->create([
            'subject' => "Subject_2",
            'exam_started' => "2024-01-06 08:00:00",
            'exam_ended' => "2024-01-16 23:00:00",
            'exam_duration' => 90,

        ]);

        Exam::factory(50)->create([
            'subject' => "Subject_3",
            'exam_started' => "2024-01-09 08:00:00",
            'exam_ended' => "2024-01-17 23:00:00",
            'exam_duration' => 120,
        ]);

        Exam::factory(25)->create([
            'subject' => "Subject_4",
            'exam_started' => "2024-01-09 08:00:00",
            'exam_ended' => "2024-01-18 23:00:00",
            'exam_duration' => 60,
        ]);
        
        
>>>>>>> 8752b647a80fcf38fcfcc73a27706928e9518e6d

       
    }
}