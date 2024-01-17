<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Subject;

class SubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Subject::create([
            'name' => "Subject_1",
            'slug' => "subject-1",
            'exam_started' => "2024-01-04 08:00:00",
            'exam_ended' => "2024-01-15 23:00:00",
            'exam_duration' => 120,

        ]);

        Subject::create([
            'name' => "Subject_2",
            'slug' => "subject-2",
            'exam_started' => "2024-01-06 08:00:00",
            'exam_ended' => "2024-01-16 23:00:00",
            'exam_duration' => 90,

        ]);

        Subject::create([
            'name' => "Subject_3",
            'slug' => "subject-3",
            'exam_started' => "2024-01-09 08:00:00",
            'exam_ended' => "2024-01-17 23:00:00",
            'exam_duration' => 120,
        ]);

        // Subject::factory(25)->create([
        //     'subject_id' => 1,
        //     'subject' => "Subject_4",
        //     'exam_started' => "2024-01-09 08:00:00",
        //     'exam_ended' => "2024-01-18 23:00:00",
        //     'exam_duration' => 60,
        // ]);
    }
}