<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OpeController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// only authenticated
Route::middleware('auth:sanctum')->group(function(){

    // auth check
    Route::get('/check', function (Request $request) {return $request->user();});

    // get
    Route::get('/gettags', [OpeController::class, 'getTags']);
    Route::get('/getSelectedMemo', [OpeController::class, 'getSelectedMemo']);
    Route::get('/getMemosByTagId', [OpeController::class, 'getMemosByTagId']);

    // post
    Route::post('/create', [OpeController::class, 'createMemo']);
    Route::post('/update', [OpeController::class, 'updateMemo']);
    Route::post('/destroy', [OpeController::class, 'destroyMemo']);
    Route::get('/getmemos', [OpeController::class, 'getMemos']);
});

// open
Route::post('/login', [AuthController::class, 'login']);
