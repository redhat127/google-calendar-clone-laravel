<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogoutController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('home');
})->name('home');

Route::middleware('guest')
    ->group(function () {
        Route::prefix('login')
            ->name('login.')
            ->controller(LoginController::class)
            ->group(function () {
                Route::get('/', 'index')->name('index');
                Route::post('/', 'post')->name('post');
                Route::get('/{provider}/redirect', 'providerRedirect')->name('provider.redirect');
                Route::get('/{provider}/callback', 'providerCallback')->name('provider.callback');
            });
    });

Route::middleware('auth')
    ->group(function () {
        Route::prefix('logout')
            ->name('logout.')
            ->controller(LogoutController::class)
            ->group(function () {
                Route::post('/', 'post')->name('post');
            });

        Route::prefix('account')
            ->name('account.')
            ->controller(AccountController::class)
            ->group(function () {
                Route::get('/', 'index')->name('index');
                Route::post('/profile-details', 'profileDetails')->name('profileDetails');
            });

        Route::prefix('event')
            ->name('event.')
            ->controller(EventController::class)
            ->group(function () {
                Route::get('/', 'index')->name('index');
                Route::get('/create', 'create')->name('create');
                Route::post('/create', 'store')->name('store');
                Route::get('/{eventId}/edit', 'edit')->name('edit');
                Route::patch('/{eventId}/edit', 'update')->name('update');
            });

        Route::prefix('book')
            ->name('book.')
            ->controller(BookController::class)
            ->group(function () {
                Route::get('/{userId}/{eventId}', 'index')->name('index');
            });
    });
