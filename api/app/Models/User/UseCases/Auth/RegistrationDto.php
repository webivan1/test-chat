<?php

namespace App\Models\User\UseCases\Auth;

class RegistrationDto
{
    public string $username;
    public string $email;
    public string $password;

    public function __construct(string $username, string $email, string $password)
    {
        $this->username = $username;
        $this->email = $email;
        $this->password = $password;
    }
}
