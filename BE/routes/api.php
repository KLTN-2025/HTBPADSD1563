<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CuocBoPhieuController;
use App\Http\Controllers\Api\PhieuBauController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'me']);

    // Cuoc Bo Phieu
    Route::apiResource('cuoc-bo-phieus', CuocBoPhieuController::class);

    // Phieu Bau
    Route::post('/phieu-baus', [PhieuBauController::class, 'store']);

    // To Chuc Don Vi
    Route::apiResource('to-chuc-don-vis', \App\Http\Controllers\Api\ToChucDonViController::class);

    // Nguoi Dung
    Route::apiResource('nguoi-dungs', \App\Http\Controllers\Api\NguoiDungController::class);

    // Lua Chon
    Route::apiResource('lua-chons', \App\Http\Controllers\Api\LuaChonController::class);

    // Cu Tri Dang Ky
    Route::apiResource('cu-tri-dang-kys', \App\Http\Controllers\Api\CuTriDangKyController::class);

    // Ket Qua Tong Hop
    Route::apiResource('ket-qua-tong-hops', \App\Http\Controllers\Api\KetQuaTongHopController::class)->only(['index', 'show', 'store']);

    // Hop Dong
    Route::apiResource('hop-dongs', \App\Http\Controllers\Api\HopDongController::class);
});
