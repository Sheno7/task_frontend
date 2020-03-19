<?php


namespace App\Customer\Domain\Requests;


use App\App\Domain\Requests\ApiRequest;

class LoginRequest extends ApiRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email'=>'required|max:200|email',
            'password'=>'required|string|min:6|max:200',
        ];
    }
}
