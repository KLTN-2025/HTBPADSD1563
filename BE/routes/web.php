<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified', 'admin.check'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('cuoc-bo-phieu', \App\Http\Controllers\CuocBoPhieuController::class);
    Route::resource('to-chuc-don-vi', \App\Http\Controllers\ToChucDonViController::class);
    Route::resource('nguoi-dung', \App\Http\Controllers\NguoiDungController::class);
    Route::resource('cu-tri-dang-ky', \App\Http\Controllers\CuTriDangKyController::class)->only(['index', 'update']);
});

require __DIR__ . '/settings.php';
