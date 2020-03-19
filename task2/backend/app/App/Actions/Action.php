<?php


namespace App\App\Actions;


use App\App\Responders\ApiResponder;

abstract class Action
{
    public $responder;

    public function __construct()
    {
        $this->responder=new ApiResponder();
    }
}
