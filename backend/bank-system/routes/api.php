<?php

use App\Http\Controllers\API\KaryawanController;
use App\Http\Controllers\API\DepartemenController;
use App\Http\Controllers\API\JabatanController;
use App\Http\Controllers\API\KomponenGajiController;
use App\Http\Controllers\API\PayrollRunController;
use App\Http\Controllers\API\SlipGajiController;
use App\Http\Controllers\API\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

Route::middleware(['auth:sanctum', 'api-typer'])->group(function () {
    Route::apiResource('karyawan', KaryawanController::class);
    Route::apiResource('departemen', DepartemenController::class);
    Route::apiResource('jabatan', JabatanController::class);
    Route::apiResource('komponen-gaji', KomponenGajiController::class);
    Route::apiResource('payroll-run', PayrollRunController::class);
    Route::apiResource('slip-gaji', SlipGajiController::class);

    Route::post('logout', [AuthController::class, 'logout']);
});
// Route::get('karyawan', function() {
//     return response()->json([
//         'status' => true,
//         'data' => [],
//     ]);
// });
