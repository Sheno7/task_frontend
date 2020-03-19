<?php


namespace App\Cart\Domain\Services;


use App\App\Domain\Payloads\GenericPayload;
use App\App\Domain\Services\Service;
use App\Customer\Domain\Repositories\CustomerRepository;
use App\Item\Domain\Repositories\ItemRepository;

class CartService extends Service
{
    private $itemRepository;

    public function __construct(ItemRepository $itemRepository)
    {
        $this->itemRepository=$itemRepository;
    }

    public function handle($data = [])
    {
        $customer=auth('api')->user();
        $totalPrice=0;
        $items=[];
        foreach ($data['items'] as $row){
            $item=$this->itemRepository->getById($row['id']);
            $totalPrice+=$item->price*$row['quantity'];
            $items[$item->id]=['quantity'=>$row['quantity']];
        }
        if($totalPrice<=$customer->store_credit){
            $customer->items()->sync($items);
            $customer->orders()->create([
                'address'=>$data['address'],
                'phone'=>$data['phone'],
                'price'=>$totalPrice]);
            $customer->store_credit-=$totalPrice;
            $customer->save();
            return new GenericPayload('success',200);
        }
        else{
            return new GenericPayload('Your Credit Not enough',400);
        }
    }
}
