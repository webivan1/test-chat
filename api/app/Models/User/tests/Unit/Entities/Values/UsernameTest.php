<?php

namespace App\Models\User\tests\Unit\Entities\Values;

use Illuminate\Support\Str;
use Tests\TestCase;
use Webmozart\Assert\InvalidArgumentException;
use App\Models\User\Entities\Values\Username;

class UsernameTest extends TestCase
{
    public function testSuccess()
    {
        $value = new Username($name = 'test username');
        $this->assertEquals($name, $value->getValue());
    }

    public function testEmptyValue()
    {
        $this->expectException(InvalidArgumentException::class);

        new Username('');
        new Username(' ');
    }

    public function testNoCorrectMinLength()
    {
        $this->expectException(InvalidArgumentException::class);

        new Username('A');
        new Username('0A');
    }

    public function testNoCorrectMaxLength()
    {
        $this->expectException(InvalidArgumentException::class);

        new Username(Str::random(101));
    }
}
