<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ExamController;
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
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('StudentHome');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/exam', [ExamController::class, 'index'])->name('exam');
});

Route::get('/dashboard-admin', function () {
    return Inertia::render('AdminPage');
})->middleware(['auth', 'verified', 'isAdmin'])->name('AdminPage');

Route::get('/dashboard-admin/soal', function () {
    return Inertia::render('AdminPageSoal');
})->middleware(['auth', 'verified', 'isAdmin'])->name('AdminPageSoal');

Route::get('/dashboard-admin/peserta', function () {
    return Inertia::render('AdminPagePeserta');
})->middleware(['auth', 'verified', 'isAdmin'])->name('AdminPagePeserta');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';