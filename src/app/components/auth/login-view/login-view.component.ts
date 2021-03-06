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
export class LoginViewComponent implements OnInit {

  loginForm: FormGroup;

  //Errors
  accountNotFoundError: boolean = false;
  notValidCredentials: boolean = false;
  invalidFormat: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private router: Router,
    private _uiActionsService: UiActionsService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() {
    return this.loginForm.get('email') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  showErrors(control: FormControl): boolean {
    const { dirty, touched, errors } = control;
    return dirty && touched && !!errors;
  }

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

        switch (error.error.statusCode) {
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
