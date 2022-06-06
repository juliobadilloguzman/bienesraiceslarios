import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UiActionsService } from 'src/app/services/ui-actions.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent {

  /**
   * Log in form.
   *
   * @type {FormGroup}
   * @memberof LoginViewComponent
   */
  loginForm: FormGroup;

  // ********** Errors ********** //

  /**
   * Account not found error.
   *
   * @type {boolean}
   * @memberof LoginViewComponent
   */
  accountNotFoundError: boolean = false;

  /**
   *
   *
   * @type {boolean}
   * @memberof LoginViewComponent
   */
  notValidCredentials: boolean = false;

  /**
   * Invalid format error.
   *
   * @type {boolean}
   * @memberof LoginViewComponent
   */
  invalidFormat: boolean = false;

  /**
   * Creates an instance of LoginViewComponent.
   * 
   * @param {FormBuilder} fb
   * @param {AuthService} _authService
   * @param {Router} router
   * @param {UiActionsService} _uiActionsService
   * @memberof LoginViewComponent
   */
  constructor(private fb: FormBuilder,
              private _authService: AuthService,
              private router: Router,
              private _uiActionsService: UiActionsService) {

    this.loginForm = this.fb.group({

      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]

    });

  }

  /**
   * Gets the email as form control.
   *
   * @readonly
   * @memberof LoginViewComponent
   */
  get email(){
    return this.loginForm.get('email') as FormControl;
  }

  /**
   * Gets the password as form control.
   *
   * @readonly
   * @memberof LoginViewComponent
   */
  get password(){
    return this.loginForm.get('password') as FormControl;
  }

  /**
   * Shows the error.
   *
   * @param {FormControl} control
   * @return {*}  {boolean}
   * @memberof LoginViewComponent
   */
  showErrors(control: FormControl): boolean {

    const { dirty, touched, errors } = control;
    return dirty && touched && !!errors;

  }

  /**
   * Log in to Bienes Raices Larios.
   *
   * @memberof LoginViewComponent
   */
  logIn(): void {

    this._uiActionsService.showSpinner();

    this.accountNotFoundError = false;
    this.notValidCredentials = false;
    this.invalidFormat = false;

    this._authService.logIn(this.email.value, this.password.value).subscribe(

      (response) => {

        if (response) {

          this._uiActionsService.hideSpinner();
          this.router.navigateByUrl('/dashboard');

        }

      },
      (error) => {

        this._uiActionsService.hideSpinner();

        switch (error?.error?.statusCode) {
          case 404:
            this.accountNotFoundError = true;
            break;
          case 401:
            this.notValidCredentials = true
            break;
          case 400:
            this.invalidFormat = true
            break;
        }

      }
      
    );

  }

}
