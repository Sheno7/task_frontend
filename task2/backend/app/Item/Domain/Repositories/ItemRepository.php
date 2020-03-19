<?php


namespace App\Item\Domain\Repositories;


use App\App\Domain\Repositories\Repository;
use App\Item\Domain\Models\Item;

class ItemRepository extends Repository
{
    protected $model;
    public function __construct(Item $item)
    {
        $this->model=$item;
    }
}
