import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario';
import { MatchPassword } from 'src/app/validators/match-password';

@Component({
  selector: 'app-mi-cuenta-view',
  templateUrl: './mi-cuenta-view.component.html',
  styleUrls: ['./mi-cuenta-view.component.scss']
})
export class MiCuentaViewComponent implements OnInit {

  cuentaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _usersService: UsuariosService,
    private _authService: AuthService,
    private matchPasswordValidator: MatchPassword
  ) {
    this.cuentaForm = this.fb.group({
      email: [],
      password: [null, [Validators.minLength(6)]],
      confirmPassword: [null, [Validators.minLength(6)]],
      nombre: [],
      apellidoPaterno: [],
      apellidoMaterno: [],
      calle: [],
      numeroExterior: [],
      numeroInterior: [],
      colonia: [],
      municipio: [],
      codigoPostal: [],
      telefonoFijo: [],
      telefonoCelular: []
    }, { validators: [this.matchPasswordValidator.validate] });

    this.email.disable();
    this.nombre.disable();
    this.apellidoPaterno.disable();
    this.apellidoMaterno.disable();
    this.calle.disable();
    this.numeroExterior.disable();
    this.numeroInterior.disable();
    this.colonia.disable();
    this.municipio.disable();
    this.codigoPostal.disable();
    this.telefonoFijo.disable();
    this.telefonoCelular.disable();

  }

  get email() {
    return this.cuentaForm.get('email') as FormControl;
  }

  get password() {
    return this.cuentaForm.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.cuentaForm.get('confirmPassword') as FormControl;
  }

  get nombre() {
    return this.cuentaForm.get('nombre') as FormControl;
  }

  get apellidoPaterno() {
    return this.cuentaForm.get('apellidoPaterno') as FormControl;
  }

  get apellidoMaterno() {
    return this.cuentaForm.get('apellidoMaterno') as FormControl;
  }

  get calle() {
    return this.cuentaForm.get('calle') as FormControl;
  }

  get numeroExterior() {
    return this.cuentaForm.get('numeroExterior') as FormControl;
  }

  get numeroInterior() {
    return this.cuentaForm.get('numeroInterior') as FormControl;
  }

  get colonia() {
    return this.cuentaForm.get('colonia') as FormControl;
  }

  get municipio() {
    return this.cuentaForm.get('municipio') as FormControl;
  }

  get codigoPostal() {
    return this.cuentaForm.get('codigoPostal') as FormControl;
  }

  get telefonoFijo() {
    return this.cuentaForm.get('telefonoFijo') as FormControl;
  }

  get telefonoCelular() {
    return this.cuentaForm.get('telefonoCelular') as FormControl;
  }

  ngOnInit(): void {

    this._authService.userId.pipe(take(1)).subscribe(
      (idUsuario: number) => {

        this._usersService.getUsuario(idUsuario).subscribe(
          (response: Usuario) => {
            console.log(response);

            //Patch values
            this.email.patchValue(response.correo);
            this.nombre.patchValue(response.nombre);
            this.apellidoPaterno.patchValue(response.apellidoPaterno);
            this.apellidoMaterno.patchValue(response.apellidoMaterno);
            this.calle.patchValue(response.calle);
            this.numeroExterior.patchValue(response.numeroExterior);
            this.colonia.patchValue(response.colonia);
            this.municipio.patchValue(response.municipio);
            this.codigoPostal.patchValue(response.codigoPostal);
            this.telefonoFijo.patchValue(response.telefonoFijo);
            this.telefonoCelular.patchValue(response.telefonoCelular);

          }
        );

      }
    );
  }

  showErrors(control: FormControl): boolean {
    const { dirty, touched, errors } = control;
    return dirty && touched && !!errors;
  }

  onSubmitForm(): void {
    this._authService.accountId.pipe(take(1)).subscribe(
      (idCuenta: number) => {
        this._authService.changePassword(idCuenta, this.password.value).subscribe(
          (response) => {
            if (response) {
              console.warn('res', response);
            }
          },
          (error) => {

          }
        );
      }
    );
  }

}
