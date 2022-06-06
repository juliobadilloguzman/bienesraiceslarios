import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario';
import { MatchPassword } from 'src/app/validators/match-password';
import { Modal, ModalType, ModalResponse } from 'src/app/models/modal';
import { UiActionsService } from 'src/app/services/ui-actions.service';

@Component({
  selector: 'app-mi-cuenta-view',
  templateUrl: './mi-cuenta-view.component.html',
  styleUrls: ['./mi-cuenta-view.component.scss']
})
export class MiCuentaViewComponent implements OnInit {

  /**
   * Cuenta Form.
   *
   * @type {FormGroup}
   * @memberof MiCuentaViewComponent
   */
  cuentaForm: FormGroup;

  /**
   * Creates an instance of MiCuentaViewComponent.
   * 
   * @param {FormBuilder} fb
   * @param {UsuariosService} _usersService
   * @param {AuthService} _authService
   * @param {MatchPassword} matchPasswordValidator
   * @param {UiActionsService} _uiActionsService
   * @memberof MiCuentaViewComponent
   */
  constructor(private fb: FormBuilder,
              private _usersService: UsuariosService,
              private _authService: AuthService,
              private matchPasswordValidator: MatchPassword,
              private _uiActionsService: UiActionsService) {

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

  /**
   * Gets the email as Form Control.
   *
   * @readonly
   * @memberof MiCuentaViewComponent
   */
  get email(){
    return this.cuentaForm.get('email') as FormControl;
  }

  /**
   * Gets the password as Form Control.
   *
   * @readonly
   * @memberof MiCuentaViewComponent
   */
  get password(){
    return this.cuentaForm.get('password') as FormControl;
  }

  /**
   * Gets the confirmPassword as Form Control.
   *
   * @readonly
   * @memberof MiCuentaViewComponent
   */
  get confirmPassword(){
    return this.cuentaForm.get('confirmPassword') as FormControl;
  }

  /**
   * Gets the Nombre as Form Control.
   *
   * @readonly
   * @memberof MiCuentaViewComponent
   */
  get nombre(){
    return this.cuentaForm.get('nombre') as FormControl;
  }

  /**
   * Gets the apellidoPaterno as Form Control.
   *
   * @readonly
   * @memberof MiCuentaViewComponent
   */
  get apellidoPaterno(){
    return this.cuentaForm.get('apellidoPaterno') as FormControl;
  }

  /**
   * Gets the apellidoMaterno as Form Control.
   *
   * @readonly
   * @memberof MiCuentaViewComponent
   */
  get apellidoMaterno(){
    return this.cuentaForm.get('apellidoMaterno') as FormControl;
  }

  /**
   * Gets the calle as Form Control.
   *
   * @readonly
   * @memberof MiCuentaViewComponent
   */
  get calle(){
    return this.cuentaForm.get('calle') as FormControl;
  }

  /**
   * Gets the numeroExterior as Form Control.
   *
   * @readonly
   * @memberof MiCuentaViewComponent
   */
  get numeroExterior(){
    return this.cuentaForm.get('numeroExterior') as FormControl;
  }

  /**
   * Gets the apellidoInterior as Form Control.
   *
   * @readonly
   * @memberof MiCuentaViewComponent
   */
  get numeroInterior(){
    return this.cuentaForm.get('numeroInterior') as FormControl;
  }

  /**
   * Gets the colonia as Form Control.
   *
   * @readonly
   * @memberof MiCuentaViewComponent
   */
  get colonia(){
    return this.cuentaForm.get('colonia') as FormControl;
  }

  /**
   * Gets the municipio as Form Control.
   *
   * @readonly
   * @memberof MiCuentaViewComponent
   */
  get municipio(){
    return this.cuentaForm.get('municipio') as FormControl;
  }

  /**
   * Gets the codigoPostal as Form Control.
   *
   * @readonly
   * @memberof MiCuentaViewComponent
   */
  get codigoPostal(){
    return this.cuentaForm.get('codigoPostal') as FormControl;
  }

  /**
   * Gets the telefonoFijo as Form Control.
   *
   * @readonly
   * @memberof MiCuentaViewComponent
   */
  get telefonoFijo(){
    return this.cuentaForm.get('telefonoFijo') as FormControl;
  }

  /**
   * Gets the telefonoCelular as Form Control.
   *
   * @readonly
   * @memberof MiCuentaViewComponent
   */
  get telefonoCelular(){
    return this.cuentaForm.get('telefonoCelular') as FormControl;
  }

  /**
   * Angular OnInit life cycle hook.
   *
   * @return {*}  {Promise<void>}
   * @memberof MiCuentaViewComponent
   */
  async ngOnInit(): Promise<void> {

    this._uiActionsService.showSpinner();

    try{

      const idUsuario: number = await this._authService.userId.pipe(take(1)).toPromise();

      const usuario: Usuario = await this._usersService.getUsuario(idUsuario).toPromise();
      
      //Patch values of the form.
      this.email.patchValue(usuario.correo);
      this.nombre.patchValue(usuario.nombre);
      this.apellidoPaterno.patchValue(usuario.apellidoPaterno);
      this.apellidoMaterno.patchValue(usuario.apellidoMaterno);
      this.calle.patchValue(usuario.calle);
      this.numeroExterior.patchValue(usuario.numeroExterior);
      this.colonia.patchValue(usuario.colonia);
      this.municipio.patchValue(usuario.municipio);
      this.codigoPostal.patchValue(usuario.codigoPostal);
      this.telefonoFijo.patchValue(usuario.telefonoFijo);
      this.telefonoCelular.patchValue(usuario.telefonoCelular);

      this._uiActionsService.hideSpinner();

    }catch{

      const modalInformation: Modal = {
        title: "Error",
        message: "Hubo un error al obtener la información del usuario.",
        type: ModalType.confirmation,
        response: ModalResponse.failed
      }

      this._uiActionsService.openConfirmationDialog(modalInformation);

    }finally{
      this._uiActionsService.hideSpinner();
    }

  }

  /**
   * Shows error form.
   *
   * @param {FormControl} control
   * @return {*}  {boolean}
   * @memberof MiCuentaViewComponent
   */
  showErrors(control: FormControl): boolean {

    const { dirty, touched, errors } = control;
    return dirty && touched && !!errors;

  }

  /**
   * Submits the form.
   *
   * @return {*}  {Promise<void>}
   * @memberof MiCuentaViewComponent
   */
  async onSubmitForm(): Promise<void> {

    this._uiActionsService.showSpinner();

    const idCuenta: number = await this._authService.accountId.pipe(take(1)).toPromise();

    try{

      await this._authService.changePassword(idCuenta, this.password.value).toPromise();

      const modalInformation: Modal = {
        title: "Editado",
        message: "La contraseña se cambió correctamente",
        type: ModalType.confirmation,
        response: ModalResponse.success
      }
      
      this._uiActionsService.openConfirmationDialog(modalInformation);

    }catch{

      const modalInformation: Modal = {
        title: "Error",
        message: "Hubo un error al editar la contraseña, inténtelo de nuevo o contacte a soporte.",
        type: ModalType.confirmation,
        response: ModalResponse.failed
      }

      this._uiActionsService.openConfirmationDialog(modalInformation);

    }finally{
      this._uiActionsService.hideSpinner();
    }

  }

}
