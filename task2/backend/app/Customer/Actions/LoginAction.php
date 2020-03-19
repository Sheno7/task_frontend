<?php


namespace App\Customer\Actions;


use App\App\Actions\Action;
use App\Customer\Domain\Requests\LoginRequest;
use App\Customer\Domain\Services\LoginService;

class LoginAction extends Action
{
    private $service;

    public function __construct(LoginService $service)
    {
        parent::__construct();
        $this->service=$service;
    }

    public function __invoke(LoginRequest $request)
    {
        return $this->responder->withResponse(
            $this->service->handle($request->validated())
        )->respond();
    }
}
