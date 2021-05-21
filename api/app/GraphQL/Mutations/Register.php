<?php

namespace App\GraphQL\Mutations;

use App\Models\User\UseCases\Auth\RegistrationDto;
use App\Models\User\UseCases\Auth\RegistrationService;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class Register
{
    private RegistrationService $service;

    public function __construct(RegistrationService $service)
    {
        $this->service = $service;
    }

    public function __invoke(mixed $rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        try {
            $user = $this->service->register(new RegistrationDto(
                $args['name'],
                $args['email'],
                $args['password']
            ));

            return [
                'status' => 'success',
                'user' => $user->toArray(),
                'accessToken' => $user->createToken('auth')->accessToken
            ];
        } catch (\DomainException $e) {
            return [
                'status' => 'fail',
                'errorMessage' => $e->getMessage()
            ];
        }
    }
}
