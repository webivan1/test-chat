<?php

namespace App\Services;

use Illuminate\Support\Str;
use Ramsey\Uuid\Uuid;

class TokenizerService
{
    public function uuid(): string
    {
        return Uuid::uuid4();
    }

    public function randomString(int $length = 32): string
    {
        return Str::random($length);
    }
}
