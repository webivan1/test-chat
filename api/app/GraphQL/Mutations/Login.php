<?php

namespace App\GraphQL\Mutations;

use App\Models\User\UseCases\Auth\LoginDto;
use App\Models\User\UseCases\Auth\LoginService;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class Login
{
    private LoginService $service;

    public function __construct(LoginService $service)
    {
        $this->service = $service;
    }

    public function __invoke(mixed $rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        try {
            $user = $this->service->login(new LoginDto($args['email'], $args['password']));

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
