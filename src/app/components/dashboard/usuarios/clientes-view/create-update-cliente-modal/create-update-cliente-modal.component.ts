import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UiActionsService } from 'src/app/services/ui-actions.service';
import { AuthService } from 'src/app/services/auth.service';
import { Modal, ModalType, ModalResponse } from 'src/app/models/modal';
import { Usuario } from 'src/app/models/usuario';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';

@Component({
  selector: 'app-create-update-cliente-modal',
  templateUrl: './create-update-cliente-modal.component.html',
  styleUrls: ['./create-update-cliente-modal.component.scss']
})
export class CreateUpdateClienteModalComponent implements OnInit {

  clienteForm: FormGroup;
  cliente: Usuario;

  constructor(
    public dialogRef: MatDialogRef<CreateUpdateClienteModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private _usuariosService: UsuariosService,
    private fb: FormBuilder,
    private _uiActionsService: UiActionsService,
    private _authService: AuthService
  ) {
    this.clienteForm = this.fb.group({
      idUsuario: [null],
      email: [null, [Validators.required, Validators.email]],
      oldEmail: [],
      password: [null, [Validators.required]],
      // password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,15}$/), Validators.minLength(6)]],
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
      idRol: [2]
    });
  }

  get idUsuario() {
    return this.clienteForm.get('idUsuario') as FormControl;
  }

  get email() {
    return this.clienteForm.get('email') as FormControl;
  }

  get oldEmail() {
    return this.clienteForm.get('oldEmail') as FormControl;
  }

  get correo() {
    return this.clienteForm.get('correo') as FormControl;
  }

  get password() {
    return this.clienteForm.get('password') as FormControl;
  }

  get nombre() {
    return this.clienteForm.get('nombre') as FormControl;
  }

  get apellidoPaterno() {
    return this.clienteForm.get('apellidoPaterno') as FormControl;
  }

  get apellidoMaterno() {
    return this.clienteForm.get('apellidoMaterno') as FormControl;
  }

  get calle() {
    return this.clienteForm.get('calle') as FormControl;
  }

  get numeroExterior() {
    return this.clienteForm.get('numeroExterior') as FormControl;
  }

  get numeroInterior() {
    return this.clienteForm.get('numeroInterior') as FormControl;
  }

  get colonia() {
    return this.clienteForm.get('colonia') as FormControl;
  }

  get municipio() {
    return this.clienteForm.get('municipio') as FormControl;
  }

  get codigoPostal() {
    return this.clienteForm.get('codigoPostal') as FormControl;
  }

  get telefonoFijo() {
    return this.clienteForm.get('telefonoFijo') as FormControl;
  }

  get telefonoCelular() {
    return this.clienteForm.get('telefonoCelular') as FormControl;
  }

  get idRol() {
    return this.clienteForm.get('idRol') as FormControl;
  }

  ngOnInit(): void {
    if (this.data.accion == 'editar') {
      this._usuariosService.getUsuario(this.data.row.idUsuario).subscribe(
        (response: Usuario) => {

          this.cliente = response;

          this.idUsuario.patchValue(this.cliente.idUsuario);
          this.oldEmail.patchValue(this.cliente.correo);
          this.email.patchValue(this.cliente.correo);
          this.nombre.patchValue(this.cliente.nombre);
          this.apellidoPaterno.patchValue(this.cliente.apellidoPaterno);
          this.apellidoMaterno.patchValue(this.cliente.apellidoMaterno);
          this.calle.patchValue(this.cliente.calle);
          this.colonia.patchValue(this.cliente.colonia);
          this.numeroExterior.patchValue(this.cliente.numeroExterior);
          this.numeroInterior.patchValue(this.cliente.numeroInterior);
          this.municipio.patchValue(this.cliente.municipio);
          this.codigoPostal.patchValue(this.cliente.codigoPostal);
          this.telefonoFijo.patchValue(this.cliente.telefonoFijo);
          this.telefonoCelular.patchValue(this.cliente.telefonoCelular);

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

    if (!this.clienteForm.valid)
      return;

    if (this.data.accion == 'crear') {

      //Remove controls
      this.clienteForm.removeControl('idUsuario');
      this.clienteForm.removeControl('correo');
      this.clienteForm.removeControl('oldEmail');

      this._authService.signUp(this.clienteForm.value).subscribe(
        (response) => {
          if (response) {
            const modalInformation: Modal = {
              title: "Creado",
              message: "El cliente se creó correctamente",
              type: ModalType.confirmation,
              response: ModalResponse.success
            }
            this._uiActionsService.openConfirmationDialog(modalInformation);
            this.dialogRef.close();
            this.clienteForm.reset();
          } else {
            const modalInformation: Modal = {
              title: "Error",
              message: "Hubo un error al crear el cliente, inténtelo de nuevo.",
              type: ModalType.confirmation,
              response: ModalResponse.failed
            }
            this._uiActionsService.openConfirmationDialog(modalInformation);
          }
        },
        (error) => {
          const modalInformation: Modal = {
            title: "Error",
            message: "Hubo un error al crear el cliente, inténtelo de nuevo.",
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

      this._authService.updateAccount(this.clienteForm.value).subscribe(
        (response) => {
          if (response) {
            console.warn(response);
            this.dialogRef.close();
            const modalInformation: Modal = {
              title: "Editado",
              message: "El cliente se editó correctamente",
              type: ModalType.confirmation,
              response: ModalResponse.success
            }
            this._uiActionsService.openConfirmationDialog(modalInformation);
            this.clienteForm.reset();
          }
        },
        (error) => {
          const modalInformation: Modal = {
            title: "Error",
            message: "Hubo un error al editar el cliente, inténtelo de nuevo.",
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
