import { Component, OnInit, Inject } from '@angular/core';
import { Fraccionamiento } from 'src/app/models/fraccionamiento';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FraccionamientosViewComponent } from '../fraccionamientos-view/fraccionamientos-view.component';
import { UiActionsService } from 'src/app/services/ui-actions.service';
import { FraccionamientosService } from 'src/app/services/fraccionamientos.service';
import { Modal, ModalType, ModalResponse } from 'src/app/models/modal';

@Component({
  selector: 'app-create-update-fraccionamiento-modal',
  templateUrl: './create-update-fraccionamiento-modal.component.html',
  styleUrls: ['./create-update-fraccionamiento-modal.component.scss']
})
export class CreateUpdateFraccionamientoModalComponent implements OnInit {

  fraccionamientoForm: FormGroup;
  fraccionamiento: Fraccionamiento;

  constructor(
    public dialogRef: MatDialogRef<CreateUpdateFraccionamientoModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private _fraccionamientosService: FraccionamientosService,
    private fb: FormBuilder,
    private _uiActionsService: UiActionsService
  ) {

    this.fraccionamientoForm = this.fb.group({
      idFraccionamiento: [],
      nombre: ['', [Validators.required]],
      regimen: [null, [Validators.required]],
      estatus: []
    });

  }

  get idFraccionamiento() {
    return this.fraccionamientoForm.get('idFraccionamiento') as FormControl;
  }

  get nombre() {
    return this.fraccionamientoForm.get('nombre') as FormControl;
  }

  get regimen() {
    return this.fraccionamientoForm.get('regimen') as FormControl;
  }

  ngOnInit(): void {
    if (this.data.accion == 'editar') {
      this._fraccionamientosService.getFraccionamiento(this.data.row.idFraccionamiento).subscribe(
        (response: Fraccionamiento) => {
          this.fraccionamientoForm.setValue(response);
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

  onSubmitForm(): void {

    if (this.data.accion == 'crear') {
      this.fraccionamientoForm.removeControl('idFraccionamiento');
      this._fraccionamientosService.createFraccionamiento(this.fraccionamientoForm.value).subscribe(
        (response: Fraccionamiento) => {
          if (response) {
            const modalInformation: Modal = {
              title: "Creado",
              message: "El fraccionamiento se creo correctamente",
              type: ModalType.confirmation,
              response: ModalResponse.success
            }
            this._uiActionsService.openConfirmationDialog(modalInformation);
            this.dialogRef.close();
            this.fraccionamientoForm.reset();
          } else {
            const modalInformation: Modal = {
              title: "Error",
              message: "Hubo un error al crear el fraccionamiento, inténtelo de nuevo.",
              type: ModalType.confirmation,
              response: ModalResponse.failed
            }
            this._uiActionsService.openConfirmationDialog(modalInformation);
          }
        },
        (error) => {
          const modalInformation: Modal = {
            title: "Error",
            message: "Hubo un error al crear el fraccionamiento, inténtelo de nuevo.",
            type: ModalType.confirmation,
            response: ModalResponse.failed
          }
          this._uiActionsService.openConfirmationDialog(modalInformation);
        }
      )
    } else {
      this._fraccionamientosService.updateFraccionamiento(this.fraccionamientoForm.value).subscribe(
        (response: Fraccionamiento) => {
          if (response) {
            const modalInformation: Modal = {
              title: "Editado",
              message: "El fraccionamiento se editó correctamente",
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
            message: "Hubo un error al editar el fraccionamiento, inténtelo de nuevo.",
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
