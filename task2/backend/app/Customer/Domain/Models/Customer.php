<?php

namespace App\Customer\Domain\Models;

use App\Cart\Domain\Models\Cart;
use App\Item\Domain\Models\Item;
use App\Order\Domain\Models\Order;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class Customer extends Authenticatable
{
    use Notifiable,HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name','last_name', 'email','store_credit', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function items(){
        return $this->belongsToMany(Item::class,'carts','customer_id','item_id');
    }
    public function orders(){
        return $this->hasMany(Order::class);
    }
    public function setPasswordAttribute($value){
        return $this->attributes['password']=bcrypt($value);
    }
}
