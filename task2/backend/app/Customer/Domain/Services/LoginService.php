<?php


namespace App\Customer\Domain\Services;


use App\App\Domain\Payloads\GenericPayload;
use App\App\Domain\Services\Service;
use App\Customer\Domain\Repositories\AuthRepository;

class LoginService extends Service
{
    private $authRepository;

    public function __construct(AuthRepository $authRepository)
    {
        $this->authRepository=$authRepository;
    }

    public function handle($data = [])
    {
        if ($user = $this->authRepository->isAuth($data)) {
            $user = $this->authRepository->login($user);
            return new GenericPayload($user);
        }
        return new GenericPayload('invalid email or password', 400);
    }
}
