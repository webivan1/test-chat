<?php

namespace App\Models\User\Entities;

use App\Models\User\Entities\Values\Email;
use App\Models\User\Entities\Values\Password;
use App\Models\User\Entities\Values\Username;
use App\Models\User\Entities\Values\VerifyToken;
use Illuminate\Contracts\Auth\MustVerifyEmail as MustVerifyEmailContract;
use Illuminate\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Laravel\Passport\HasApiTokens;

/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $password
 * @property string $status
 * @property string|null $verify_email_token
 * @property Carbon|null $email_verified_at
 */
class User extends Authenticatable implements MustVerifyEmailContract
{
    use HasFactory;
    use Notifiable;
    use HasApiTokens;
    use MustVerifyEmail;

    public const STATUS_ACTIVE = 'active';
    public const STATUS_BLOCKED = 'blocked';

    private ?string $originPassword;

    /**
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function toArray(): array
    {
        return [
            'id' => (string) $this->id,
            'email' => $this->email,
            'name' => $this->name,
            'verified' => $this->hasVerifiedEmail()
        ];
    }

    public function getVerifiedAttribute(): bool
    {
        return $this->hasVerifiedEmail();
    }

    public function sendEmailVerificationNotification(): void
    {
        // @todo write custom email
        //$this->notify(new VerifyEmail);
    }

    public function isActive(): bool
    {
        return $this->status === self::STATUS_ACTIVE;
    }

    public function isBlocked(): bool
    {
        return $this->status === self::STATUS_BLOCKED;
    }

    public function updateVerifyToken(VerifyToken $token): void
    {
        $this->verify_email_token = $token->getValue();

        if ($this->hasVerifiedEmail()) {
            throw new \DomainException('This user is already verified');
        }

        if (!$this->save()) {
            throw new \DomainException('Error update token');
        }
    }

    public static function new(Username $username, Email $email, Password $password, VerifyToken $token): self
    {
        $user = new self();
        $user->name = $username->getValue();
        $user->email = $email->getValue();
        $user->password = Hash::make($password->getValue());
        $user->status = self::STATUS_ACTIVE;
        $user->verify_email_token = $token->getValue();
        $user->email_verified_at = null;
        $user->originPassword = $password->getValue();

        if (!$user->save()) {
            throw new \DomainException('Error create user');
        }

        return $user;
    }

    public function verify(): void
    {
        $this->verify_email_token = null;
        $this->email_verified_at = now();

        if (!$this->save()) {
            throw new \DomainException('Error verify user');
        }
    }

    public static function getUserByVerifyToken(VerifyToken $token): User
    {
        /** @var User|null $user */
        $user = self::where('verify_email_token', $token->getValue())->first();

        if (!$user) {
            throw new \DomainException('This token is not exists');
        }

        if (!$user->isActive()) {
            throw new \DomainException('This user is not active');
        }

        if ($user->hasVerifiedEmail()) {
            throw new \DomainException('This user is already verified');
        }

        return $user;
    }

    public static function findUserByEmail(Email $email): ?User
    {
        /** @var User|null $user */
        return self::where('email', $email->getValue())->first();
    }

    public static function getUserByEmail(Email $email): User
    {
        /** @var User|null $user */
        if (!$user = self::findUserByEmail($email)) {
            throw new \DomainException('User is not found');
        }

        return $user;
    }

    public function checkPassword(Password $password): bool
    {
        return Hash::check($password->getValue(), $this->password);
    }
}
