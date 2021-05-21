<?php

namespace App\Models\User\Entities\Values;

use App\Contracts\ValueObjectContract;
use Webmozart\Assert\Assert;

class VerifyToken implements ValueObjectContract
{
    private string $value;

    public function __construct(string $value)
    {
        Assert::notEmpty($value);
        Assert::minLength($value, 30);

        $this->value = $value;
    }

    public function getValue(): string
    {
        return $this->value;
    }
}
