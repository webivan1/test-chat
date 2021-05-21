<?php

namespace App\Models\User\Entities\Values;

use App\Contracts\ValueObjectContract;
use Webmozart\Assert\Assert;

class Email implements ValueObjectContract
{
    private string $value;

    public function __construct(string $value)
    {
        $value = trim($value);

        Assert::notEmpty($value);
        Assert::email($value);
        Assert::maxLength($value, 150);

        $this->value = $value;
    }

    public function getValue(): string
    {
        return $this->value;
    }
}
