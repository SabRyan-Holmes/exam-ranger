<?php

namespace Database\Factories;
use DateTime;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Exam>
 */
class ExamFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $choice = fake()->words(4);
        // $subjects = ['subjects_1', 'subjects_2']
        return [
<<<<<<< HEAD
            // 'subject' => fake()->randomElement(['subjects_1', 'subjects_2']),
            'exam_started' => fake()->dateTimeThisYear(),
            'exam_ended' => fake()->dateTimeThisYear(),
            'exam_duration' => fake()->randomElement([90, 120]),
=======
            
            // 'exam_started' => fake()->dateTimeThisYear(),
            // 'exam_ended' => fake()->dateTimeThisYear(),
            // 'exam_duration' => fake()->randomElement([90, 120]),
>>>>>>> 8752b647a80fcf38fcfcc73a27706928e9518e6d
            'question' => fake()->sentence(20),
            'choice' => $choice,
            // 'image' => fake()->(),
            'is_essay' => fake()->boolean(),
            'is_active' => fake()->boolean(),
            'actual_answer' => $choice[array_rand($choice)],
        ];
    }
}