<?php


namespace App\Cart\Domain\Requests;


use App\App\Domain\Requests\ApiRequest;

class CartRequest extends ApiRequest
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
            'address'=>'required|string|max:200',
            'phone'=>'required|string|min:6|max:200',
            'items'=>'required|array',
            'items.*.id'=>'required|exists:items,id',
            'items.*.quantity'=>'required|integer|min:1'
        ];
    }
}
