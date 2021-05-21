<?php

namespace App\GraphQL\Mutations;

use App\Models\User\UseCases\Auth\RegistrationDto;
use App\Models\User\UseCases\Auth\RegistrationService;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class SendVerifyToken
{
    private RegistrationService $service;

    public function __construct(RegistrationService $service)
    {
        $this->service = $service;
    }

    public function __invoke(mixed $rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        try {
            $this->service->sendVerifyToken(
                $context->request()->user()
            );

            return [
                'status' => 'success'
            ];
        } catch (\DomainException $e) {
            return [
                'status' => 'fail',
                'errorMessage' => $e->getMessage()
            ];
        }
    }
}
