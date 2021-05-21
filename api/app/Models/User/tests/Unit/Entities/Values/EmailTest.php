<?php

namespace App\Models\User\tests\Unit\Entities\Values;

use Tests\TestCase;
use Webmozart\Assert\InvalidArgumentException;
use App\Models\User\Entities\Values\Email;

class EmailTest extends TestCase
{
    public function testSuccess()
    {
        $value = new Email($email = 'test@test.com');
        $this->assertEquals($email, $value->getValue());
    }

    public function testEmptyValue()
    {
        $this->expectException(InvalidArgumentException::class);

        new Email('');
        new Email(' ');
    }

    public function testNoCorrectEmails()
    {
        $this->expectException(InvalidArgumentException::class);

        new Email('A@.com');
        new Email('B@com');
    }
}
