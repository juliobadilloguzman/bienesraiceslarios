import { Component, OnInit, Inject } from '@angular/core';
import { Mensualidad } from 'src/app/models/mensualidad';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MensualidadesService } from 'src/app/services/mensualidades.service';
import { UiActionsService } from 'src/app/services/ui-actions.service';
import { Modal, ModalType, ModalResponse } from 'src/app/models/modal';
import { DateAdapter } from '@angular/material/core';
import * as moment from 'moment';

@Component({
  selector: 'app-create-update-mensualidad-modal',
  templateUrl: './create-update-mensualidad-modal.component.html',
  styleUrls: ['./create-update-mensualidad-modal.component.scss']
})
export class CreateUpdateMensualidadModalComponent implements OnInit {

  mensualidadForm: FormGroup;
  mensualidad: Mensualidad;

  tieneInteres: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CreateUpdateMensualidadModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private _mensualidadService: MensualidadesService,
    private fb: FormBuilder,
    private _uiActionsService: UiActionsService,
    private dateAdapter: DateAdapter<Date>
  ) {

    this.dateAdapter.setLocale('en-GB');

    this.mensualidadForm = this.fb.group({
      idMensualidad: [],
      numeroMensualidad: [null, [Validators.required]],
      numeroRecibo: [null],
      fechaPago: [null],
      monto: [null, [Validators.required]],
      cantidadConLetra: [null],
      mes: [null, [Validators.required]],
      formaPago: [null],
      estatusPago: [null, Validators.required],
      interes: [null],
      estatusInteres: [null],
      estatus: [null],
      terrenoIdTerreno: [null]
    });

  }

  get idMensualidad() {
    return this.mensualidadForm.get('idMensualidad') as FormControl;
  }

  get numeroMensualidad() {
    return this.mensualidadForm.get('numeroMensualidad') as FormControl;
  }

  get numeroRecibo() {
    return this.mensualidadForm.get('numeroRecibo') as FormControl;
  }

  get fechaPago() {
    return this.mensualidadForm.get('fechaPago') as FormControl;
  }

  get monto() {
    return this.mensualidadForm.get('monto') as FormControl;
  }

  get cantidadConLetra() {
    return this.mensualidadForm.get('cantidadConLetra') as FormControl;
  }

  get mes() {
    return this.mensualidadForm.get('mes') as FormControl;
  }

  get formaPago() {
    return this.mensualidadForm.get('formaPago') as FormControl;
  }

  get estatusPago() {
    return this.mensualidadForm.get('estatusPago') as FormControl;
  }

  get estatus() {
    return this.mensualidadForm.get('estatus') as FormControl;
  }

  get interes() {
    return this.mensualidadForm.get('interes') as FormControl;
  }

  get estatusInteres() {
    return this.mensualidadForm.get('estatusInteres') as FormControl;
  }

  get terrenoIdTerreno() {
    return this.mensualidadForm.get('terrenoIdTerreno') as FormControl;
  }

  ngOnInit(): void {

    //Disable Estatus si la mensalidad esta pagada
    if (this.data.accion == 'editar' && this.data.row.estatusPago == 'PAGADA') {
      this.estatusPago.disable();
    }

    //Patch id Terreno value
    this.terrenoIdTerreno.patchValue(this.data.idTerreno);

    //Patch monto mensualidad
    this.monto.patchValue(this.data.montoMensualidad);

    //Patch interes
    this.interes.patchValue(this.data.montoMensualidad * .10);

    console.warn('DATA', this.data);

    if (this.data.accion == 'editar') {

      this._mensualidadService.getMensualidad(this.data.row.idMensualidad).subscribe(
        (response: Mensualidad) => {

          this.mensualidadForm.removeControl('terrenoIdTerreno');
          this.mensualidad = response;
          delete this.mensualidad.terreno;
          delete this.mensualidad.usuario;
          console.log('mensualidad', this.mensualidad);

          //Patch interes
          if(this.mensualidad.estatusInteres == 'NO PAGADO'){
            this.tieneInteres = true;
          }

          this.mensualidadForm.setValue(this.mensualidad);

          this.mensualidadForm.addControl('terrenoIdTerreno', new FormControl(this.data.idTerreno));

        },

        (error) => {
          const modalInformation: Modal = {
            title: "Error",
            message: "Error al cargar la informacion, verifique su conexion a internet e inténtelo de nuevo",
            type: ModalType.confirmation,
            response: ModalResponse.failed
          }
          this._uiActionsService.openConfirmationDialog(modalInformation);
        }
      );
    }
  }

  showErrors(control: FormControl): boolean {
    const { dirty, touched, errors } = control;
    return dirty && touched && !!errors;
  }

  onSetInteres(checked: boolean) {
    if (checked) {
      this.tieneInteres = true;

      //Update validators
      this.interes.setValidators([Validators.required]);
      this.interes.updateValueAndValidity();

      this.estatusInteres.setValidators([Validators.required]);
      this.estatusInteres.updateValueAndValidity();

    } else {
      this.tieneInteres = false;

      this.interes.clearValidators()
      this.interes.updateValueAndValidity();

      this.estatusInteres.clearValidators()
      this.estatusInteres.updateValueAndValidity();

    }
  }

  onSubmitForm(): void {

    console.log('MENSUALIDAD TO INSERT', this.mensualidadForm.value);

    if (!this.tieneInteres) {
      this.interes.patchValue(null);
    }

    if (this.estatusPago.value == 'NO PAGADA') {
      this.monto.patchValue(0);
      this.fechaPago.patchValue(null);
      this.numeroRecibo.patchValue(null);
      this.cantidadConLetra.patchValue(null);
      this.formaPago.patchValue(null);
    }


    if (this.data.accion == 'crear') {
      this.mensualidadForm.removeControl('idMensualidad');
      this._mensualidadService.createMensualidad(this.mensualidadForm.value).subscribe(
        (response: any) => {

          if (response) {

            const modalInformation: Modal = {
              title: "Agregada",
              message: "La mensualidad se agregó correctamente",
              type: ModalType.confirmation,
              response: ModalResponse.success
            }

            this._uiActionsService.openConfirmationDialog(modalInformation);
            this.dialogRef.close();
            this.mensualidadForm.reset();

          } else {

            const modalInformation: Modal = {
              title: "Error",
              message: "Hubo un error al agregar la mensualidad, inténtelo de nuevo.",
              type: ModalType.confirmation,
              response: ModalResponse.failed
            }

            this._uiActionsService.openConfirmationDialog(modalInformation);

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
        }
      );
    } else {

      this._mensualidadService.updateMensualidad(this.mensualidadForm.value).subscribe(
        (response: any) => {
          
          const modalInformation: Modal = {
            title: "Editada",
            message: "La mensualidad se editó correctamente",
            type: ModalType.confirmation,
            response: ModalResponse.success
          }
          
          this._uiActionsService.openConfirmationDialog(modalInformation);
          this.dialogRef.close();
          this.mensualidadForm.reset();
          
        }, 
        (error) => {

          const modalInformation: Modal = {
            title: "Error",
            message: "Hubo un error al editar la mensualidad, inténtelo de nuevo.",
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
