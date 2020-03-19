<?php

namespace App\Order\Domain\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable=['customer_id','price','address','phone'];
}
