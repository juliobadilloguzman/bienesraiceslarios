import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UiActionsService } from 'src/app/services/ui-actions.service';
import { AuthService } from 'src/app/services/auth.service';
import { Modal, ModalType, ModalResponse } from 'src/app/models/modal';
import { Action } from 'src/app/models/action.enum';

@Component({
  selector: 'app-create-update-administrador-modal',
  templateUrl: './create-update-administrador-modal.component.html',
  styleUrls: ['./create-update-administrador-modal.component.scss']
})
export class CreateUpdateAdministradorModalComponent implements OnInit {

  /**
   * Whole form.
   *
   * @type {FormGroup}
   * @memberof CreateUpdateAdministradorModalComponent
   */
  administradorForm: FormGroup;

  /**
   * Current administraor if is editing.
   *
   * @type {Usuario}
   * @memberof CreateUpdateAdministradorModalComponent
   */
  administrador: Usuario;

  /**
   * Creates an instance of CreateUpdateAdministradorModalComponent.
   * 
   * @param {MatDialogRef<CreateUpdateAdministradorModalComponent>} dialogRef
   * @param {*} data
   * @param {UsuariosService} _usuariosService
   * @param {FormBuilder} fb
   * @param {UiActionsService} _uiActionsService
   * @param {AuthService} _authService
   * @memberof CreateUpdateAdministradorModalComponent
   */
  constructor(public dialogRef: MatDialogRef<CreateUpdateAdministradorModalComponent>,
              @Inject(MAT_DIALOG_DATA)
              public data: any,
              private _usuariosService: UsuariosService,
              private fb: FormBuilder,
              private _uiActionsService: UiActionsService,
              private _authService: AuthService
  ) {

    this.administradorForm = this.fb.group({
      idUsuario: [null],
      email: [null, [Validators.required, Validators.email]],
      oldEmail: [],
      password: [null, [Validators.required, Validators.minLength(6)]],
      nombre: ['', [Validators.required, Validators.pattern(/^([A-Za-z0-9\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/)]],
      apellidoPaterno: ['', [Validators.pattern(/^([A-Za-z0-9\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/)]],
      apellidoMaterno: ['', [Validators.pattern(/^([A-Za-z0-9\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/)]],
      calle: [null],
      numeroExterior: [null],
      numeroInterior: [null],
      colonia: [null],
      municipio: [null],
      codigoPostal: [null],
      telefonoFijo: [null, [Validators.pattern(/^\d+$/)]],
      telefonoCelular: [null, [Validators.pattern(/^\d+$/)]],
      idRol: [1]
    });

  }

  /**
   * Gets the id of the Usuario as form control.
   *
   * @readonly
   * @memberof CreateUpdateAdministradorModalComponent
   */
  get idUsuario(){
    return this.administradorForm.get('idUsuario') as FormControl;
  }

  /**
   * Gets the email as form control.
   *
   * @readonly
   * @memberof CreateUpdateAdministradorModalComponent
   */
  get email(){
    return this.administradorForm.get('email') as FormControl;
  }

  /**
   * Gets the old email as form control.
   *
   * @readonly
   * @memberof CreateUpdateAdministradorModalComponent
   */
  get oldEmail(){
    return this.administradorForm.get('oldEmail') as FormControl;
  }

  /**
   * Gets the correo as Form Control.
   *
   * @readonly
   * @memberof CreateUpdateAdministradorModalComponent
   */
  get correo(){
    return this.administradorForm.get('correo') as FormControl;
  }

  get password(){
    return this.administradorForm.get('password') as FormControl;
  }

  get nombre(){
    return this.administradorForm.get('nombre') as FormControl;
  }

  get apellidoPaterno(){
    return this.administradorForm.get('apellidoPaterno') as FormControl;
  }

  get apellidoMaterno(){
    return this.administradorForm.get('apellidoMaterno') as FormControl;
  }

  get calle(){
    return this.administradorForm.get('calle') as FormControl;
  }

  get numeroExterior(){
    return this.administradorForm.get('numeroExterior') as FormControl;
  }

  get numeroInterior(){
    return this.administradorForm.get('numeroInterior') as FormControl;
  }

  get colonia(){
    return this.administradorForm.get('colonia') as FormControl;
  }

  get municipio(){
    return this.administradorForm.get('municipio') as FormControl;
  }

  get codigoPostal(){
    return this.administradorForm.get('codigoPostal') as FormControl;
  }

  get telefonoFijo(){
    return this.administradorForm.get('telefonoFijo') as FormControl;
  }

  get telefonoCelular(){
    return this.administradorForm.get('telefonoCelular') as FormControl;
  }

  get idRol(){
    return this.administradorForm.get('idRol') as FormControl;
  }

  /**
   * Angular OnInit life cycle hook.
   *
   * @return {*}  {Promise<void>}
   * @memberof CreateUpdateAdministradorModalComponent
   */
  async ngOnInit(): Promise<void> {

    if (this.data.accion == Action.EDITAR) {

      this._uiActionsService.showSpinner();

      try{

        const usuario: Usuario = await this._usuariosService.getUsuario(this.data.administrador.idUsuario).toPromise();

        this.administrador = usuario;

        this.idUsuario.patchValue(this.administrador.idUsuario);
        this.oldEmail.patchValue(this.administrador.correo);
        this.email.patchValue(this.administrador.correo);
        this.nombre.patchValue(this.administrador.nombre);
        this.apellidoPaterno.patchValue(this.administrador.apellidoPaterno);
        this.apellidoMaterno.patchValue(this.administrador.apellidoMaterno);
        this.calle.patchValue(this.administrador.calle);
        this.colonia.patchValue(this.administrador.colonia);
        this.numeroExterior.patchValue(this.administrador.numeroExterior);
        this.numeroInterior.patchValue(this.administrador.numeroInterior);
        this.municipio.patchValue(this.administrador.municipio);
        this.codigoPostal.patchValue(this.administrador.codigoPostal);
        this.telefonoFijo.patchValue(this.administrador.telefonoFijo);
        this.telefonoCelular.patchValue(this.administrador.telefonoCelular);

        //Remove validator from password
        this.password.clearValidators();
        this.password.updateValueAndValidity();
        this.password.setValidators([Validators.pattern(/^[a-zA-Z0-9]*$/), Validators.minLength(6)]);
        this.password.updateValueAndValidity();     

      }catch{

        const modalInformation: Modal = {
          title: "Error",
          message: "Error al cargar la informacion, verifique su conexion a internet e inténtelo de nuevo",
          type: ModalType.confirmation,
          response: ModalResponse.failed
        }

        this._uiActionsService.openConfirmationDialog(modalInformation);

      }finally{
        this._uiActionsService.hideSpinner();
      }

    }

  }

  /**
   * Shows the error form.
   *
   * @param {FormControl} control
   * @return {*}  {boolean}
   * @memberof CreateUpdateAdministradorModalComponent
   */
  showErrors(control: FormControl): boolean {

    const { dirty, touched, errors } = control;
    return dirty && touched && !!errors;

  }

  /**
   * Submits the form.
   *
   * @return {*} 
   * @memberof CreateUpdateAdministradorModalComponent
   */
  async onSubmitForm(): Promise<void>{

    if (!this.administradorForm.valid)
      return;

    if (this.data.accion == Action.CREAR) {

      this._uiActionsService.showSpinner();

      try{

        //Remove controls
        this.administradorForm.removeControl('idUsuario');
        this.administradorForm.removeControl('correo');
        this.administradorForm.removeControl('oldEmail');

        await this._authService.signUp(this.administradorForm.value).toPromise();

        const modalInformation: Modal = {
          title: "Creado",
          message: "El administrador se creó correctamente",
          type: ModalType.confirmation,
          response: ModalResponse.success
        }

        this._uiActionsService.openConfirmationDialog(modalInformation);
        this.dialogRef.close();
        this.administradorForm.reset();

      }catch{

        const modalInformation: Modal = {
          title: "Error",
          message: "Hubo un error al crear el administrador, inténtelo de nuevo.",
          type: ModalType.confirmation,
          response: ModalResponse.failed
        }

        this._uiActionsService.openConfirmationDialog(modalInformation);

      }finally{
        this._uiActionsService.hideSpinner();
      }

    } else {

      this._uiActionsService.showSpinner();

      if (this.password.value == null || this.password.value == "") {
        this.password.setValue(null);
      }

      try{
        
        await this._authService.updateAccount(this.administradorForm.value).toPromise();

        this.dialogRef.close();

        const modalInformation: Modal = {
          title: "Editado",
          message: "El administrador se editó correctamente",
          type: ModalType.confirmation,
          response: ModalResponse.success
        }

        this._uiActionsService.openConfirmationDialog(modalInformation);
        this.administradorForm.reset();

      }catch{

        const modalInformation: Modal = {
          title: "Error",
          message: "Hubo un error al editar el administrador, inténtelo de nuevo.",
          type: ModalType.confirmation,
          response: ModalResponse.failed
        }

        this._uiActionsService.openConfirmationDialog(modalInformation);
        
      }finally{
        this._uiActionsService.hideSpinner();
      }
    }

  }

  /**
   * Closes the dialog.
   *
   * @memberof CreateUpdateAdministradorModalComponent
   */
  closeDialog() {
    this.dialogRef.close();
  }


}
