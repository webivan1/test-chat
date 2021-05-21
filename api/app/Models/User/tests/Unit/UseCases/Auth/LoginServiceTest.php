<?php

namespace App\Models\User\tests\Unit\UseCases\Auth;

use App\Models\User\Entities\User;
use App\Models\User\Entities\Values\Email;
use App\Models\User\Entities\Values\Password;
use App\Models\User\Entities\Values\Username;
use App\Models\User\Entities\Values\VerifyToken;
use App\Models\User\UseCases\Auth\LoginDto;
use App\Models\User\UseCases\Auth\LoginService;
use App\Models\User\UseCases\Auth\RegistrationDto;
use App\Models\User\UseCases\Auth\RegistrationService;
use App\Services\TokenizerService;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Event;
use Tests\TestCase;

class LoginServiceTest extends TestCase
{
    use DatabaseTransactions;

    protected function initService(User $user): LoginService
    {
        return $this->app->make(LoginService::class);
    }

    public function testSuccess()
    {
        $service = $this->initService($user = $this->createUser());
        $result = $service->login(new LoginDto($user->email, self::USER_PASSWORD));
        $this->assertTrue($result->isActive());
        $this->assertEquals($result->email, $user->email);
        $this->assertEquals($result->id, $user->id);
    }

    public function testBlockedUser()
    {
        $user = $this->createUser();
        $user->status = User::STATUS_BLOCKED;
        $user->save();

        $service = $this->initService($user);

        $this->expectException(\DomainException::class);

        $service->login(new LoginDto($user->email, self::USER_PASSWORD));
    }

    public function testNoCorrectPassword()
    {
        $user = $this->createUser();

        $service = $this->initService($user);

        $this->expectException(\DomainException::class);

        $service->login(new LoginDto($user->email, '111111'));
    }
}
