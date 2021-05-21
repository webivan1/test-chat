<?php

namespace App\Providers;

use App\Rules\CaptchaRule;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Validator::extend('captcha', function ($attribute, $value) {
            return (new CaptchaRule())->passes($attribute, $value);
        }, (new CaptchaRule())->message());
    }
}
