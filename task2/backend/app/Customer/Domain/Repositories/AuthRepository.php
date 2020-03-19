<?php


namespace App\Customer\Domain\Repositories;


use Illuminate\Support\Facades\Auth;

class AuthRepository extends CustomerRepository
{
    public function login($user)
    {
        $tokenResult = $user->createToken(\Str::random(8));
        $token = $tokenResult->token;
        $token->save();
        $data['user']=$user;
        $data['token']=$tokenResult->accessToken;
        return $data;
    }

    public function isAuth($credentials){
        if(!Auth::attempt($credentials))
            return false;
        return $this->getByEmail($credentials['email']);
    }
    public function logout($user)
    {
        return $user->token()->revoke();
    }
}
