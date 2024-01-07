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

Route::get('/dashboard', function () {
    return Inertia::render('AdminPage');
})->middleware(['auth', 'verified', 'isAdmin'])->name('AdminPage');

Route::get('/dashboard/soal', [AdminController::class, 'soal'])->middleware(['auth', 'verified', 'isAdmin'])->name('admin.soal');

Route::get('/dashboard/peserta', [AdminController::class, 'peserta'])->middleware(['auth', 'verified', 'isAdmin'])->name('admin.peserta');

Route::post('/dashboard/soal/add-soal', [AdminController::class, 'store'])->middleware(['auth', 'verified', 'isAdmin'])->name('admin.create-soal');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});




require __DIR__.'/auth.php';