<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AnswerController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Auth/Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->middleware(['isAlreadyLoggedIn']);


Route::middleware('auth', 'verified')->group(function () {
    Route::get('/home', [ExamController::class, 'all'])->name('home');
    Route::post('/exam/update-doing-exam', [ExamController::class, 'updateDoingExam']);
});

Route::middleware('auth', 'verified')->group(function () {
    Route::post('/exam', [AnswerController::class, 'store'])->name('exam.submit');
    Route::get('/exam', [ExamController::class, 'show'])->name('exam.show');
    Route::get('/exam/done', [AnswerController::class, 'show'])->name('exam.done');
});



Route::prefix('dashboard')->middleware(['auth', 'verified', 'isAdmin'])->name('admin.')->group(function () {
    // Dashboard
    Route::get('', [AdminController::class, 'index'])->name('dashboard');
    
    // CRUD Exam
    Route::get('/soal', [AdminController::class, 'soal'])->name('soal');
    Route::post('/soal/delete-soal', [AdminController::class, 'destroy'])->name('soal-delete');
    Route::get('/soal-ujian', [AdminController::class, 'tipeSoal'])->name('soal-tipe');
    Route::post('/soal/add-soal', [AdminController::class, 'store'])->name('create-soal');
    Route::post('/soal/edit-soal', [AdminController::class, 'edit'])->name('edit-soal');
    Route::post('/soal/edit-subject', [AdminController::class, 'editSubject'])->name('edit-subject');
    
    // CRUD Peserta
    Route::get('/peserta', [AdminController::class, 'peserta'])->name('peserta');
    Route::post('/peserta', [AdminController::class, 'store_peserta'])->name('create-peserta');
    Route::patch('/peserta', [AdminController::class, 'update_peserta'])->name('update-peserta');
    Route::delete('/peserta', [AdminController::class, 'destroy_peserta'])->name('delete-peserta');

    // CRUD Overview
    Route::get('/overview', [AdminController::class, 'overview'])->name('overview');
    Route::get('/overview/subject', [AdminController::class, 'show_subject'])->name('show-subject');
    Route::post('/overview', [AdminController::class, 'store_overview'])->name('create-overview');
    Route::patch('/overview', [AdminController::class, 'update_overview'])->name('update-overview');
    Route::delete('/overview', [AdminController::class, 'destroy_overview'])->name('delete-overview');

});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});




require __DIR__.'/auth.php';