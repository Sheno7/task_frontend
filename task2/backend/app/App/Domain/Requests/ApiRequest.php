<?php

namespace App\App\Domain\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ApiRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        if ($validator->fails()) {
            $errors = $validator->messages()->toArray();
            foreach ($errors as $key => $error) {
                $errorR[$key] = $error[0];
            }
            $data['status']=0;
            $data['errors']=$errorR;
            throw new HttpResponseException(response()->json($data, 422));
        }
    }
}
