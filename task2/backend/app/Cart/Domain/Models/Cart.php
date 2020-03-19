<?php

namespace App\Cart\Domain\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $fillable=['customer_id','item_id','quantity'];

}
