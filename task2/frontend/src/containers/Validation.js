import validator from 'validator';
import React from 'react'
const style = {
    error: {
        'color': 'red',
        'display': 'blocked',
    }
}
export class Validation {
    errors = {};
    constructor(values, rules) {
        const Keys = Object.keys(values);
        Keys.forEach(key => {
            let value = values[key];
            let rule = rules[key];
            let error = this.doValidation(value, rule);
            if (error.length > 0)
                this.errors[key] = error;
        })
    }
    doValidation(value, rules) {
        let message = '';
        rules.forEach(rule => {
            switch (rule) {
                case 'required': if (validator.isEmpty(value)) message = 'input required'; break;
                case 'number': if (!validator.isNumeric(value)) message = 'input must be numeric'; break;
                case 'email': if (!validator.isEmail(value)) message = 'input must be email'; break;
                case 'phone': if (!validator.isLength(value, { min: 6, max: 191 })) message = 'input must be Phone number'; break;
                case 'password': if (!validator.isLength(value, { min: 6, max: 191 })) message = 'Password must min 6'; break;
                default : message='';
            }
        })
        return message;
    }
    success() {
        if (Object.keys(this.errors).length>0)
            return false
        return true;
    }
    message(key){
        return this.errors[key] !== undefined?  <span style={style.error}>{this.errors[key]}</span> :''
                          
    }
    displayError(value){
        return value?<span style={style.error}>{value}</span>:''
    }
}



export default Validation
