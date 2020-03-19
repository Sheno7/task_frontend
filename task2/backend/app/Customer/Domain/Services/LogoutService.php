<?php


namespace App\Customer\Domain\Services;


use App\App\Domain\Payloads\GenericPayload;
use App\App\Domain\Services\Service;
use App\Customer\Domain\Repositories\AuthRepository;

class LogoutService extends Service
{
    protected $authRepository;
    public function __construct(AuthRepository $authRepository)
    {
        $this->authRepository=$authRepository;
    }

    public function handle($data = [])
    {
        $this->authRepository->logout(auth('api')->user());
        return new GenericPayload();
    }
}
