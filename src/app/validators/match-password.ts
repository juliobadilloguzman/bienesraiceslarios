import { Validator, FormControl, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MatchPassword implements Validator {

    validate(formGroup: FormGroup) {

        const { password, confirmPassword } = formGroup.value;

        if (password == confirmPassword) return null; else return { passwordsDontMatch: true };

    }

}
