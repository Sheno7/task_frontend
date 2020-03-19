<?php


namespace App\Customer\Domain\Repositories;


use App\App\Domain\Repositories\Repository;
use App\Customer\Domain\Models\Customer;

class CustomerRepository extends Repository
{
    protected $model;

    public function __construct(Customer $customer)
    {
        $this->model=$customer;
    }
    public function getByEmail($email)
    {
        return $this->model->where('email', $email)->first();
    }
}
