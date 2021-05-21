<?php

namespace App\Models\User\tests\Unit\Entities\Values;

use Tests\TestCase;
use Illuminate\Support\Str;
use App\Models\User\Entities\Values\Password;
use Webmozart\Assert\InvalidArgumentException;

class PasswordTest extends TestCase
{
    public function testSuccess()
    {
        $value = new Password($password = '123456');
        $this->assertEquals($password, $value->getValue());
    }

    public function testEmptyValue()
    {
        $this->expectException(InvalidArgumentException::class);

        new Password('');
        new Password(' ');
    }

    public function testNoCorrectMinLength()
    {
        $this->expectException(InvalidArgumentException::class);

        new Password('B2C2A');
    }

    public function testNoCorrectMaxLength()
    {
        $this->expectException(InvalidArgumentException::class);

        new Password(Str::random(65));
    }
}
