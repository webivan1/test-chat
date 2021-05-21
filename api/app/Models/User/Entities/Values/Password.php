<?php

namespace App\Models\User\Entities\Values;

use App\Contracts\ValueObjectContract;
use Webmozart\Assert\Assert;

class Password implements ValueObjectContract
{
    private string $value;

    public function __construct(string $password)
    {
        Assert::notEmpty($password);
        Assert::minLength($password, 6);
        Assert::maxLength($password, 64);

        $this->value = $password;
    }

    public function getValue(): string
    {
        return $this->value;
    }
}
