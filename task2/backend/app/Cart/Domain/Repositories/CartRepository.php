<?php


namespace App\Cart\Domain\Repositories;


use App\App\Domain\Repositories\Repository;
use App\Item\Domain\Models\Item;

class CartRepository extends Repository
{
    protected $model;
    public function __construct(Item $item)
    {
        $this->model=$item;
    }
}
