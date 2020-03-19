<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::group(['middleware'=>'auth:api'], function () {
    Route::post('checktoken',function (){return response()->json(['status'=>1]);});
    Route::post('cart',\App\Cart\Actions\CartAction::class);
    Route::post('logout',\App\Customer\Actions\LoginAction::class);
});

Route::post('login',\App\Customer\Actions\LoginAction::class);
Route::get('get-items',\App\Item\Actions\GetItemsAction::class);
