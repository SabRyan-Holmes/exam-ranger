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
});

// Route::get('/', function () {
//     return Inertia::render('Auth/Login');
// })->middleware(['guest'])->name('logins');


Route::get('/home', [ExamController::class, 'all'])->middleware(['auth', 'verified'])->name('home');

Route::middleware('auth')->group(function () {
    Route::get('/exam', [ExamController::class, 'index'])->name('exam');
    Route::post('/exam/submit', [AnswerController::class, 'store'])->name('exam.submit');
    Route::get('/exam/done', [AnswerController::class, 'show'])->name('exam.done');

});

// ;
// })->middleware(['auth', 'verified', 'isAdmin']);

Route::prefix('dashboard')->middleware(['auth', 'verified', 'isAdmin'])->name('admin.')->group(function () {
    // Dashboard
    Route::get('', [AdminController::class, 'index'])->name('dashboard');
    
    // CRUD Exam
    Route::get('/soal', [AdminController::class, 'soal'])->name('soal');
    Route::post('/soal/delete-soal', [AdminController::class, 'destroy'])->name('soal-delete');
    Route::get('/soal-ujian', [AdminController::class, 'tipeSoal'])->name('soal-tipe');
    Route::post('/soal/add-soal', [AdminController::class, 'store'])->name('create-soal');
    Route::post('/soal/edit-soal', [AdminController::class, 'edit'])->name('edit-soal');
    
    // CRUD Peserta
    Route::get('/peserta', [AdminController::class, 'peserta'])->name('peserta');
    Route::post('/peserta', [AdminController::class, 'store_peserta'])->name('create-peserta');


});



// ->middleware(['auth', 'verified', 'isAdmin']);

// ->middleware(['auth', 'verified', 'isAdmin'])->name('admin.soal-delete');

// ->middleware(['auth', 'verified', 'isAdmin'])->name('admin.soal-tipe');

// ->middleware(['auth', 'verified', 'isAdmin'])->name('admin.peserta');

// ->middleware(['auth', 'verified', 'isAdmin'])->name('admin.create-soal');

// ->middleware(['auth', 'verified', 'isAdmin'])->name('admin.edit-soal');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});




require __DIR__.'/auth.php';