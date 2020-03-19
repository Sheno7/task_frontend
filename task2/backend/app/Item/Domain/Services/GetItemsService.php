<?php


namespace App\Item\Domain\Services;


use App\App\Domain\Payloads\GenericPayload;
use App\App\Domain\Services\Service;
use App\Item\Domain\Repositories\ItemRepository;
use App\Item\Domain\Resources\ItemResource;

class GetItemsService extends Service
{
    private $itemRepository;
    public function __construct(ItemRepository $itemRepository)
    {
        $this->itemRepository=$itemRepository;
    }

    public function handle($data = [])
    {
        $data=ItemResource::collection($this->itemRepository->getAll());
        return new GenericPayload($data);
        // TODO: Implement handle() method.
    }
}
