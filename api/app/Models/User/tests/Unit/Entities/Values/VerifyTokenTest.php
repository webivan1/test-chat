<?php

namespace App\Models\User\tests\Unit\Entities\Values;

use Tests\TestCase;
use App\Models\User\Entities\Values\VerifyToken;
use App\Services\TokenizerService;
use Webmozart\Assert\InvalidArgumentException;

class VerifyTokenTest extends TestCase
{
    public function testSuccess()
    {
        $tokenizer = $this->app->make(TokenizerService::class);
        $value = new VerifyToken($token = $tokenizer->randomString(32));
        $this->assertEquals($token, $value->getValue());
    }

    public function testEmptyValue()
    {
        $this->expectException(InvalidArgumentException::class);

        new VerifyToken('');
    }

    public function testErrorMinValue()
    {
        $this->expectException(InvalidArgumentException::class);

        $tokenizer = $this->app->make(TokenizerService::class);
        new VerifyToken($tokenizer->randomString(29));
    }
}
