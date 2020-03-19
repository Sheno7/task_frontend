<?php


namespace App\Cart\Actions;


use App\App\Actions\Action;
use App\Cart\Domain\Requests\CartRequest;
use App\Cart\Domain\Services\CartService;

class CartAction extends Action
{
    private $service;

    public function __construct(CartService $service)
    {
        parent::__construct();
        $this->service=$service;
    }
    public function __invoke(CartRequest $request)
    {
        return $this->responder->withResponse(
            $this->service->handle($request->validated())
        )->respond();
    }
}
