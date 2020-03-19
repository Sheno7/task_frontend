<?php


namespace App\Item\Actions;


use App\App\Actions\Action;
use App\Item\Domain\Services\GetItemsService;

class GetItemsAction extends Action
{
    private $service;

    public function __construct(GetItemsService $service)
    {
        parent::__construct();
        $this->service = $service;
    }

    public function __invoke()
    {
        return $this->responder->withResponse(
            $this->service->handle()
        )->respond();
    }
}
