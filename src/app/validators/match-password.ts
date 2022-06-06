import { Validator, FormControl, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MatchPassword implements Validator {

    /**
     * Validates the passwords.
     *
     * @param {FormGroup} formGroup
     * @return {*} 
     * @memberof MatchPassword
     */
    validate(formGroup: FormGroup): any{

        const { password, confirmPassword } = formGroup.value;

        if (password == confirmPassword) return null; else return { passwordsDontMatch: true };

    }

}
