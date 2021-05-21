<?php

namespace App\GraphQL\Mutations;

use App\Models\User\UseCases\Auth\RegistrationDto;
use App\Models\User\UseCases\Auth\RegistrationService;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class VerifyEmail
{
    private RegistrationService $service;

    public function __construct(RegistrationService $service)
    {
        $this->service = $service;
    }

    public function __invoke(mixed $rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        try {
            $user = $this->service->verify($args['token']);

            return [
                'status' => 'success',
                'user' => $user->toArray()
            ];
        } catch (\DomainException $e) {
            return [
                'status' => 'fail',
                'errorMessage' => $e->getMessage()
            ];
        }
    }
}
