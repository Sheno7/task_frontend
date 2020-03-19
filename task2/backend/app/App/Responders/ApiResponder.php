<?php


namespace App\App\Responders;


class ApiResponder extends Responder implements ResponderInterface
{
    public function respond()
    {
        switch ($this->response->getStatus())
        {
            case 200:return $this->success();break;
            case 400:return $this->error();break;
            case 403:return $this->error();break;
            default :return $this->success();
        }
    }
    public function success()
    {
        return response()->json(['status'=>1,'data'=>$this->response->getData()],200);
    }

    public function error(){
        return response()->json(['status'=>0,'message'=>$this->response->getData()],$this->response->getStatus());
    }
}
