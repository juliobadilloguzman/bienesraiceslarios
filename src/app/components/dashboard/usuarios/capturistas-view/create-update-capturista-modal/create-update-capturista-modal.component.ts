import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UiActionsService } from 'src/app/services/ui-actions.service';
import { AuthService } from 'src/app/services/auth.service';
import { Modal, ModalResponse, ModalType } from 'src/app/models/modal';

@Component({
  selector: 'app-create-update-capturista-modal',
  templateUrl: './create-update-capturista-modal.component.html',
  styleUrls: ['./create-update-capturista-modal.component.scss']
})
export class CreateUpdateCapturistaModalComponent implements OnInit {

  capturistaForm: FormGroup;
  capturista: Usuario;

  constructor(
    public dialogRef: MatDialogRef<CreateUpdateCapturistaModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private _usuariosService: UsuariosService,
    private fb: FormBuilder,
    private _uiActionsService: UiActionsService,
    private _authService: AuthService
  ) {
    this.capturistaForm = this.fb.group({
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
      idRol: [3]
    });
  }

  get idUsuario() {
    return this.capturistaForm.get('idUsuario') as FormControl;
  }

  get email() {
    return this.capturistaForm.get('email') as FormControl;
  }

  get oldEmail() {
    return this.capturistaForm.get('oldEmail') as FormControl;
  }

  get correo() {
    return this.capturistaForm.get('correo') as FormControl;
  }

  get password() {
    return this.capturistaForm.get('password') as FormControl;
  }

  get nombre() {
    return this.capturistaForm.get('nombre') as FormControl;
  }

  get apellidoPaterno() {
    return this.capturistaForm.get('apellidoPaterno') as FormControl;
  }

  get apellidoMaterno() {
    return this.capturistaForm.get('apellidoMaterno') as FormControl;
  }

  get calle() {
    return this.capturistaForm.get('calle') as FormControl;
  }

  get numeroExterior() {
    return this.capturistaForm.get('numeroExterior') as FormControl;
  }

  get numeroInterior() {
    return this.capturistaForm.get('numeroInterior') as FormControl;
  }

  get colonia() {
    return this.capturistaForm.get('colonia') as FormControl;
  }

  get municipio() {
    return this.capturistaForm.get('municipio') as FormControl;
  }

  get codigoPostal() {
    return this.capturistaForm.get('codigoPostal') as FormControl;
  }

  get telefonoFijo() {
    return this.capturistaForm.get('telefonoFijo') as FormControl;
  }

  get telefonoCelular() {
    return this.capturistaForm.get('telefonoCelular') as FormControl;
  }

  get idRol() {
    return this.capturistaForm.get('idRol') as FormControl;
  }

  ngOnInit(): void {
    if (this.data.accion == 'editar') {
      this._usuariosService.getUsuario(this.data.row.idUsuario).subscribe(
        (response: Usuario) => {

          this.capturista = response;

          this.idUsuario.patchValue(this.capturista.idUsuario);
          this.oldEmail.patchValue(this.capturista.correo);
          this.email.patchValue(this.capturista.correo);
          this.nombre.patchValue(this.capturista.nombre);
          this.apellidoPaterno.patchValue(this.capturista.apellidoPaterno);
          this.apellidoMaterno.patchValue(this.capturista.apellidoMaterno);
          this.calle.patchValue(this.capturista.calle);
          this.colonia.patchValue(this.capturista.colonia);
          this.numeroExterior.patchValue(this.capturista.numeroExterior);
          this.numeroInterior.patchValue(this.capturista.numeroInterior);
          this.municipio.patchValue(this.capturista.municipio);
          this.codigoPostal.patchValue(this.capturista.codigoPostal);
          this.telefonoFijo.patchValue(this.capturista.telefonoFijo);
          this.telefonoCelular.patchValue(this.capturista.telefonoCelular);

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

    if (!this.capturistaForm.valid)
      return;

    if (this.data.accion == 'crear') {

      //Remove controls
      this.capturistaForm.removeControl('idUsuario');
      this.capturistaForm.removeControl('correo');
      this.capturistaForm.removeControl('oldEmail');

      this._authService.signUp(this.capturistaForm.value).subscribe(
        (response) => {
          if (response) {
            const modalInformation: Modal = {
              title: "Creado",
              message: "El capturista se creó correctamente",
              type: ModalType.confirmation,
              response: ModalResponse.success
            }
            this._uiActionsService.openConfirmationDialog(modalInformation);
            this.dialogRef.close();
            this.capturistaForm.reset();
          } else {
            const modalInformation: Modal = {
              title: "Error",
              message: "Hubo un error al crear el capturista, inténtelo de nuevo.",
              type: ModalType.confirmation,
              response: ModalResponse.failed
            }
            this._uiActionsService.openConfirmationDialog(modalInformation);
          }
        },
        (error) => {
          const modalInformation: Modal = {
            title: "Error",
            message: "Hubo un error al crear el capturista, inténtelo de nuevo.",
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

      this._authService.updateAccount(this.capturistaForm.value).subscribe(
        (response) => {
          if (response) {
            console.warn(response);
            this.dialogRef.close();
            const modalInformation: Modal = {
              title: "Editado",
              message: "El capturista se editó correctamente",
              type: ModalType.confirmation,
              response: ModalResponse.success
            }
            this._uiActionsService.openConfirmationDialog(modalInformation);
            this.capturistaForm.reset();
          }
        },
        (error) => {
          const modalInformation: Modal = {
            title: "Error",
            message: "Hubo un error al editar el capturista, inténtelo de nuevo.",
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
