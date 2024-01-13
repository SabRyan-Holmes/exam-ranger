<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\ExamSeeder;
use Database\Seeders\OverviewSeeder;
use Database\Seeders\StudentSeeder;
use Database\Seeders\AnswerSeeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin
        User::factory()->create([
            'name' => 'Admin',
            'nim' => 'admin',
            // admin.eranger@gmail.com
            'email' => 'anatoranger@gmail.com',
            'password' => bcrypt("12345678"),
            'is_admin' => true
        ]);

        $this->call([
            StudentSeeder::class,
            ExamSeeder::class,
            OverviewSeeder::class,
            AnswerSeeder::class
        ]);
    }
}