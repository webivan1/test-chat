<?php

namespace App\Models\User\UseCases\Auth;

use App\Models\User\Entities\User;
use App\Models\User\Entities\Values\Email;
use App\Models\User\Entities\Values\Password;
use App\Models\User\Entities\Values\Username;
use App\Models\User\Entities\Values\VerifyToken;
use App\Services\TokenizerService;
use Illuminate\Support\Facades\Log;

class RegistrationService
{
    private TokenizerService $tokenizer;

    public function __construct(TokenizerService $tokenizer)
    {
        $this->tokenizer = $tokenizer;
    }

    public function register(RegistrationDto $dto): User
    {
        try {
            if (User::findUserByEmail(new Email($dto->email))) {
                throw new \DomainException('This email is already exists');
            }

            $user = User::new(
                new Username($dto->username),
                new Email($dto->email),
                new Password($dto->password),
                new VerifyToken($this->tokenizer->randomString(40))
            );

            $user->sendEmailVerificationNotification();

            return $user;
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            throw new \DomainException($e->getMessage());
        }
    }

    public function verify(string $token): User
    {
        try {
            $user = User::getUserByVerifyToken(new VerifyToken($token));
            $user->verify();

            return $user;
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            throw new \DomainException($e->getMessage());
        }
    }

    public function sendVerifyToken(User $user): void
    {
        try {
            $user->updateVerifyToken(new VerifyToken($this->tokenizer->randomString(40)));
            $user->sendEmailVerificationNotification();
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            throw new \DomainException($e->getMessage());
        }
    }
}
