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
      nombre: ['', [Validators.required, Validators.pattern(/^([A-Za-z0-9\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/)]],
      regimen: [null, [Validators.required]],
      municipio: [null, [Validators.required]],
      estado: ['Morelos', [Validators.required]],
      ubicacionMaps: [null],
      estatusFraccionamiento: ['ACTIVO']
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

  get municipio() {
    return this.fraccionamientoForm.get('municipio') as FormControl;
  }

  get estado() {
    return this.fraccionamientoForm.get('estado') as FormControl;
  }

  get ubicacionMaps() {
    return this.fraccionamientoForm.get('ubicacionMaps') as FormControl;
  }

  get estatusFraccionamiento() {
    return this.fraccionamientoForm.get('estatusFraccionamiento') as FormControl;
  }

  ngOnInit(): void {

    if (this.data.accion == 'editar') {

      this._fraccionamientosService.getFraccionamiento(this.data.row.idFraccionamiento).subscribe(
        (response: Fraccionamiento) => {

          if (response) {
            this.fraccionamientoForm.setValue(response);
          }

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

    this._uiActionsService.showSpinner();

    if (this.data.accion == 'crear') {

      this.fraccionamientoForm.removeControl('idFraccionamiento');
      this._fraccionamientosService.createFraccionamiento(this.fraccionamientoForm.value).subscribe(

        (response: Fraccionamiento) => {

          if (response) {

            this._uiActionsService.hideSpinner();

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

            this._uiActionsService.hideSpinner();

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

          this._uiActionsService.hideSpinner();

          const modalInformation: Modal = {
            title: "Error",
            message: "Hubo un error al crear el fraccionamiento, inténtelo de nuevo.",
            type: ModalType.confirmation,
            response: ModalResponse.failed
          }

          this._uiActionsService.openConfirmationDialog(modalInformation);

        }
      );
      
    } else {

      this._fraccionamientosService.updateFraccionamiento(this.fraccionamientoForm.value).subscribe(
        (response: Fraccionamiento) => {

          if (response) {

            this._uiActionsService.hideSpinner();

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

          this._uiActionsService.hideSpinner();

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
