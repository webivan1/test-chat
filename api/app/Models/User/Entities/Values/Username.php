<?php

namespace App\Models\User\Entities\Values;

use App\Contracts\ValueObjectContract;
use Webmozart\Assert\Assert;

class Username implements ValueObjectContract
{
    private string $value;

    public function __construct(string $value)
    {
        $value = trim($value);

        Assert::notEmpty($value);
        Assert::minLength($value, 3);
        Assert::maxLength($value, 100);

        $this->value = $value;
    }

    public function getValue(): string
    {
        return $this->value;
    }
}
