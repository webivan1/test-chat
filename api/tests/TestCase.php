<?php

namespace Tests;

use App\Models\User\Entities\User;
use App\Models\User\Entities\Values\Email;
use App\Models\User\Entities\Values\Password;
use App\Models\User\Entities\Values\Username;
use App\Models\User\Entities\Values\VerifyToken;
use App\Services\TokenizerService;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    public const USER_PASSWORD = 'tester';

    protected function createUser(): User
    {
        $tokenizer = $this->app->make(TokenizerService::class);

        $fake = User::factory()->make();

        return User::new(
            $username = new Username($fake->name),
            $email = new Email($fake->email),
            $password = new Password(self::USER_PASSWORD),
            $token = new VerifyToken($tokenizer->randomString(32))
        );
    }
}
