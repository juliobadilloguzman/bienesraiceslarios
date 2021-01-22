import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { VendedoresService } from 'src/app/services/vendedores.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Vendedor } from 'src/app/models/vendedor';
import { UiActionsService } from 'src/app/services/ui-actions.service';
import { ModalType, ModalResponse, Modal } from 'src/app/models/modal';

@Component({
  selector: 'app-create-update-vendedor-modal',
  templateUrl: './create-update-vendedor-modal.component.html',
  styleUrls: ['./create-update-vendedor-modal.component.scss']
})
export class CreateUpdateVendedorModalComponent implements OnInit {

  vendedorForm: FormGroup;
  vendedor: Vendedor;

  constructor(
    public dialogRef: MatDialogRef<CreateUpdateVendedorModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private _vendedorService: VendedoresService,
    private fb: FormBuilder,
    private _uiActionsService: UiActionsService,
    private dialog: MatDialog) {

    this.vendedorForm = this.fb.group({
      idVendedor: [],
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      apellidoPaterno: ['', [Validators.pattern(/^[a-zA-Z\s]*$/)]],
      apellidoMaterno: ['', [Validators.pattern(/^[a-zA-Z\s]*$/)]],
      telefono: [''],
      correo: ['', Validators.email]
    });

  }

  get idVendedor() {
    return this.vendedorForm.get('idVendedor');
  }

  get nombre() {
    return this.vendedorForm.get('nombre') as FormControl;
  }

  get apellidoPaterno() {
    return this.vendedorForm.get('apellidoPaterno') as FormControl;
  }

  get apellidoMaterno() {
    return this.vendedorForm.get('apellidoMaterno') as FormControl;
  }
  get telefono() {
    return this.vendedorForm.get('telefono') as FormControl;
  }

  get correo() {
    return this.vendedorForm.get('correo') as FormControl;
  }

  ngOnInit(): void {
    if (this.data.accion == 'editar') {
      this._vendedorService.getVendedor(this.data.row.idVendedor).subscribe(
        (response: Vendedor) => {
          this.vendedorForm.setValue(response);
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

    if (this.data.accion == 'crear') {
      this.vendedorForm.removeControl('idVendedor');
      this._vendedorService.createVendedor(this.vendedorForm.value).subscribe(
        (response: Vendedor) => {
          if (response) {
            const modalInformation: Modal = {
              title: "Creado",
              message: "El vendedor se creo correctamente",
              type: ModalType.confirmation,
              response: ModalResponse.success
            }
            this._uiActionsService.openConfirmationDialog(modalInformation);
            this.dialogRef.close();
            this.vendedorForm.reset();
          } else {
            const modalInformation: Modal = {
              title: "Error",
              message: "Hubo un error al crear el vendedor, inténtelo de nuevo.",
              type: ModalType.confirmation,
              response: ModalResponse.failed
            }
            this._uiActionsService.openConfirmationDialog(modalInformation);
          }
        },
        (error) => {
          const modalInformation: Modal = {
            title: "Error",
            message: "Hubo un error al crear el vendedor, inténtelo de nuevo.",
            type: ModalType.confirmation,
            response: ModalResponse.failed
          }
          this._uiActionsService.openConfirmationDialog(modalInformation);
        }
      );
    } else {
      this._vendedorService.updateVendedor(this.vendedorForm.value).subscribe(
        (response: Vendedor) => {
          if (response) {
            const modalInformation: Modal = {
              title: "Editado",
              message: "El vendedor se edito correctamente",
              type: ModalType.confirmation,
              response: ModalResponse.success
            }
            this._uiActionsService.openConfirmationDialog(modalInformation);
            this.dialogRef.close();
          }
        },
        (error) => {
          const modalInformation: Modal = {
            title: "Error",
            message: "Hubo un error al editar el vendedor, inténtelo de nuevo.",
            type: ModalType.confirmation,
            response: ModalResponse.failed
          }
          this._uiActionsService.openConfirmationDialog(modalInformation);
        }
      )
    }

  }

  closeDialog() {
    this.dialogRef.close();
  }

}
