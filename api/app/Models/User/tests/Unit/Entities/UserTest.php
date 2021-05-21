<?php

namespace App\Models\User\tests\Unit\Entities;

use App\Models\User\Entities\User;
use App\Models\User\Entities\Values\Email;
use App\Models\User\Entities\Values\Password;
use App\Models\User\Entities\Values\Username;
use App\Models\User\Entities\Values\VerifyToken;
use App\Services\TokenizerService;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class UserTest extends TestCase
{
    use DatabaseTransactions;

    public function testCreate()
    {
        $tokenizer = $this->app->make(TokenizerService::class);

        $fake = User::factory()->make();

        $user = User::new(
            $username = new Username($fake->name),
            $email = new Email($fake->email),
            $password = new Password('tester'),
            $token = new VerifyToken($tokenizer->randomString(32))
        );

        $this->assertInstanceOf(User::class, $user);
        $this->assertNotEmpty($user->id);
        $this->assertEquals($user->email, $email->getValue());
        $this->assertEquals($user->name, $username->getValue());
        $this->assertTrue(Hash::check($password->getValue(), $user->password));
        $this->assertEquals($user->verify_email_token, $token->getValue());
        $this->assertTrue($user->isActive());
        $this->assertFalse($user->hasVerifiedEmail());
    }

    public function testVerify()
    {
        $user = $this->createUser();

        $this->assertFalse($user->hasVerifiedEmail());

        $user->verify();

        $this->assertTrue($user->hasVerifiedEmail());
    }

    public function testUpdateToken()
    {
        $user = $this->createUser();
        $oldToken = $user->verify_email_token;

        $tokenizer = $this->app->make(TokenizerService::class);

        $user->updateVerifyToken(new VerifyToken($token = $tokenizer->randomString(40)));

        $this->assertNotEquals($oldToken, $user->verify_email_token);
        $this->assertEquals($token, $user->verify_email_token);
    }

    public function testCheckPassword()
    {
        $user = $this->createUser();
        $this->assertTrue($user->checkPassword(new Password('tester')));
        $this->assertFalse($user->checkPassword(new Password('123456')));
    }

    public function testFindUser()
    {
        $user = $this->createUser();

        $result = User::findUserByEmail(new Email($user->email));

        $this->assertTrue($result->id === $user->id);
    }
}
