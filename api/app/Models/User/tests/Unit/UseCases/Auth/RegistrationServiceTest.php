<?php

namespace App\Models\User\tests\Unit\UseCases\Auth;

use App\Models\User\Entities\User;
use App\Models\User\Entities\Values\Email;
use App\Models\User\Entities\Values\Password;
use App\Models\User\Entities\Values\Username;
use App\Models\User\Entities\Values\VerifyToken;
use App\Models\User\UseCases\Auth\RegistrationDto;
use App\Models\User\UseCases\Auth\RegistrationService;
use App\Services\TokenizerService;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Event;
use Tests\TestCase;

class RegistrationServiceTest extends TestCase
{
    use DatabaseTransactions;

    public function testUniqueUser()
    {
        $user = $this->createUser();

        $this->expectException(\DomainException::class);

        $dto = new RegistrationDto('Test user', $user->email, '123123');
        $service = $this->app->make(RegistrationService::class);
        $service->register($dto);
    }

    public function testError()
    {
        $this->expectException(\DomainException::class);

        $dto = new RegistrationDto(' ', 'a@', '123');
        $service = $this->app->make(RegistrationService::class);
        $service->register($dto);
    }

    public function testSuccess()
    {
        Event::fake();

        $dto = new RegistrationDto('Test user', 'test@test.test', '123456');
        $service = $this->app->make(RegistrationService::class);
        $user = $service->register($dto);

        $this->assertInstanceOf(User::class, $user);
        $this->assertNotEmpty($user->id);
        $this->assertEquals($user->email, $dto->email);
        $this->assertEquals($user->name, $dto->username);
        $this->assertFalse($user->hasVerifiedEmail());
    }

    public function testVerifyError()
    {
        $tokenizer = $this->app->make(TokenizerService::class);
        $this->createUser();

        $this->expectException(\DomainException::class);

        $service = $this->app->make(RegistrationService::class);
        $service->verify($tokenizer->randomString(33));
    }

    public function testVerifySuccess()
    {
        $user = $this->createUser();

        $service = $this->app->make(RegistrationService::class);
        $newUser = $service->verify($user->verify_email_token);

        $this->assertTrue($newUser->hasVerifiedEmail());
        $this->assertEquals($newUser->id, $user->id);
        $this->assertEquals($newUser->email, $user->email);
    }

    public function testSendVerifyTokenSuccess()
    {
        $user = $this->createUser();
        $oldToken = $user->verify_email_token;

        $service = $this->app->make(RegistrationService::class);
        $service->sendVerifyToken($user);

        $this->assertFalse($oldToken === $user->verify_email_token);
    }
}
