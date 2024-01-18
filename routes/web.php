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


Route::middleware('auth', 'verified', 'isDoingExamCheck')->group(function () {
    Route::get('/home', [ExamController::class, 'all'])->name('home');
});

Route::middleware('auth', 'verified')->group(function () {
    Route::post('/exam', [AnswerController::class, 'store'])->name('exam.submit');
    Route::get('/exam', [ExamController::class, 'show'])->name('exam.show');
    Route::get('/exam-current', [ExamController::class, 'showCurrentWork'])->name('exam.show.current');
    Route::get('/exam/done', [AnswerController::class, 'show'])->name('exam.done');
});



Route::prefix('dashboard')->middleware(['auth', 'verified', 'isAdmin'])->name('admin.')->group(function () {
    // Dashboard
    Route::get('', [AdminController::class, 'index'])->name('dashboard');
    
    // CRUD Subject
    Route::get('/materi-ujian', [AdminController::class, 'all_subject'])->name('subject');
    Route::post('/materi-ujian', [AdminController::class, 'store_subject'])->name('create-subject');
    Route::patch('/materi-ujian', [AdminController::class, 'update_subject'])->name('update-subject');
    
    
    // CRUD Exam
    Route::get('/soal', [AdminController::class, 'soal'])->name('soal-show');
    Route::post('/soal/add-soal', [AdminController::class, 'store_soal'])->name('create-soal');
    Route::post('/soal/update-soal', [AdminController::class, 'update_soal'])->name('update-soal');
    Route::post('/soal/delete-soal', [AdminController::class, 'destroy_soal'])->name('soal-delete');
    
    // CRUD Peserta
    Route::get('/peserta', [AdminController::class, 'all_peserta'])->name('peserta');
    Route::post('/peserta', [AdminController::class, 'store_peserta'])->name('create-peserta');
    Route::patch('/peserta', [AdminController::class, 'update_peserta'])->name('update-peserta');
    Route::delete('/peserta', [AdminController::class, 'destroy_peserta'])->name('delete-peserta');

    // CRUD Overview
    Route::get('/overview', [AdminController::class, 'overview'])->name('overview');
    Route::get('/overview/subject', [AdminController::class, 'overview_subject'])->name('show-subject');
    Route::post('/overview', [AdminController::class, 'store_overview'])->name('create-overview');
    Route::patch('/overview', [AdminController::class, 'update_overview'])->name('update-overview');
    Route::delete('/overview', [AdminController::class, 'destroy_overview'])->name('delete-overview');

});


Route::middleware('auth', 'isDoingExamCheck')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});




require __DIR__.'/auth.php';