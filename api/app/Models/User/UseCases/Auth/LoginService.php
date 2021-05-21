<?php

namespace App\Models\User\UseCases\Auth;

use App\Models\User\Entities\User;
use App\Models\User\Entities\Values\Email;
use App\Models\User\Entities\Values\Password;
use Illuminate\Support\Facades\Log;

class LoginService
{
    public function login(LoginDto $dto): User
    {
        try {
            if (!$user = User::findUserByEmail(new Email($dto->email))) {
                throw new \DomainException('You do not have an account');
            }

            if (!$user->checkPassword(new Password($dto->password))) {
                throw new \DomainException('Password is not correct');
            }

            if (!$user->isActive()) {
                throw new \DomainException('Your account is not active');
            }

            return $user;
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            throw new \DomainException($e->getMessage());
        }
    }
}
