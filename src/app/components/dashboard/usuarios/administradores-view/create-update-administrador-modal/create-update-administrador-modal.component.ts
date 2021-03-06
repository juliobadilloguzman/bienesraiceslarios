import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UiActionsService } from 'src/app/services/ui-actions.service';
import { AuthService } from 'src/app/services/auth.service';
import { Modal, ModalType, ModalResponse } from 'src/app/models/modal';

@Component({
  selector: 'app-create-update-administrador-modal',
  templateUrl: './create-update-administrador-modal.component.html',
  styleUrls: ['./create-update-administrador-modal.component.scss']
})
export class CreateUpdateAdministradorModalComponent implements OnInit {

  administradorForm: FormGroup;
  administrador: Usuario;

  constructor(
    public dialogRef: MatDialogRef<CreateUpdateAdministradorModalComponent>,
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
      password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,15}$/), Validators.minLength(6)]],
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

  get idUsuario() {
    return this.administradorForm.get('idUsuario') as FormControl;
  }

  get email() {
    return this.administradorForm.get('email') as FormControl;
  }

  get oldEmail() {
    return this.administradorForm.get('oldEmail') as FormControl;
  }

  get correo() {
    return this.administradorForm.get('correo') as FormControl;
  }

  get password() {
    return this.administradorForm.get('password') as FormControl;
  }

  get nombre() {
    return this.administradorForm.get('nombre') as FormControl;
  }

  get apellidoPaterno() {
    return this.administradorForm.get('apellidoPaterno') as FormControl;
  }

  get apellidoMaterno() {
    return this.administradorForm.get('apellidoMaterno') as FormControl;
  }

  get calle() {
    return this.administradorForm.get('calle') as FormControl;
  }

  get numeroExterior() {
    return this.administradorForm.get('numeroExterior') as FormControl;
  }

  get numeroInterior() {
    return this.administradorForm.get('numeroInterior') as FormControl;
  }

  get colonia() {
    return this.administradorForm.get('colonia') as FormControl;
  }

  get municipio() {
    return this.administradorForm.get('municipio') as FormControl;
  }

  get codigoPostal() {
    return this.administradorForm.get('codigoPostal') as FormControl;
  }

  get telefonoFijo() {
    return this.administradorForm.get('telefonoFijo') as FormControl;
  }

  get telefonoCelular() {
    return this.administradorForm.get('telefonoCelular') as FormControl;
  }

  get idRol() {
    return this.administradorForm.get('idRol') as FormControl;
  }

  ngOnInit(): void {
    if (this.data.accion == 'editar') {
      this._usuariosService.getUsuario(this.data.row.idUsuario).subscribe(
        (response: Usuario) => {

          this.administrador = response;

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

        },
        (error) => {
          const modalInformation: Modal = {
            title: "Error",
            message: "Error al cargar la informacion, verifique su conexion a internet e inténtelo de nuevo",
            type: ModalType.confirmation,
            response: ModalResponse.failed
          }
          this._uiActionsService.openConfirmationDialog(modalInformation);
        });
    }
  }

  showErrors(control: FormControl): boolean {
    const { dirty, touched, errors } = control;
    return dirty && touched && !!errors;
  }

  onSubmitForm() {

    if (!this.administradorForm.valid)
      return;

    if (this.data.accion == 'crear') {

      //Remove controls
      this.administradorForm.removeControl('idUsuario');
      this.administradorForm.removeControl('correo');
      this.administradorForm.removeControl('oldEmail');

      this._authService.signUp(this.administradorForm.value).subscribe(
        (response) => {
          if (response) {
            const modalInformation: Modal = {
              title: "Creado",
              message: "El administrador se creó correctamente",
              type: ModalType.confirmation,
              response: ModalResponse.success
            }
            this._uiActionsService.openConfirmationDialog(modalInformation);
            this.dialogRef.close();
            this.administradorForm.reset();
          } else {
            const modalInformation: Modal = {
              title: "Error",
              message: "Hubo un error al crear el administrador, inténtelo de nuevo.",
              type: ModalType.confirmation,
              response: ModalResponse.failed
            }
            this._uiActionsService.openConfirmationDialog(modalInformation);
          }
        },
        (error) => {
          const modalInformation: Modal = {
            title: "Error",
            message: "Hubo un error al crear el administrador, inténtelo de nuevo.",
            type: ModalType.confirmation,
            response: ModalResponse.failed
          }
          this._uiActionsService.openConfirmationDialog(modalInformation);
        }
      );

    } else {

      if (this.password.value == null || this.password.value == "") {
        this.password.setValue(null);
      }

      this._authService.updateAccount(this.administradorForm.value).subscribe(
        (response) => {
          if (response) {
            console.warn(response);
            this.dialogRef.close();
            const modalInformation: Modal = {
              title: "Editado",
              message: "El administrador se editó correctamente",
              type: ModalType.confirmation,
              response: ModalResponse.success
            }
            this._uiActionsService.openConfirmationDialog(modalInformation);
            this.administradorForm.reset();
          }
        },
        (error) => {
          const modalInformation: Modal = {
            title: "Error",
            message: "Hubo un error al editar el administrador, inténtelo de nuevo.",
            type: ModalType.confirmation,
            response: ModalResponse.failed
          }
          this._uiActionsService.openConfirmationDialog(modalInformation);
        }
      );

    }

  }

  closeDialog() {
    this.dialogRef.close();
  }


}
