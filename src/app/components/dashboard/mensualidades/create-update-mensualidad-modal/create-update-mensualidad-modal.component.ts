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
      fechaPago: [null, [Validators.required]],
      monto: [null, [Validators.required]],
      cantidadConLetra: [null],
      mes: [null, [Validators.required]],
      formaPago: [null, [Validators.required]],
      estatusPago: [],
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

  get terrenoIdTerreno() {
    return this.mensualidadForm.get('terrenoIdTerreno') as FormControl;
  }

  ngOnInit(): void {

    //Patch id Terreno value
    this.terrenoIdTerreno.patchValue(this.data.idTerreno);

    //Patch monto mensualidad
    this.monto.patchValue(this.data.montoMensualidad);

    console.warn('DATA', this.data);

    if (this.data.accion == 'editar') {
      this._mensualidadService.getMensualidad(this.data.row.idMensualidad).subscribe(
        (response: Mensualidad) => {
          this.mensualidadForm.removeControl('terrenoIdTerreno');
          this.mensualidad = response;
          delete this.mensualidad.terreno;
          delete this.mensualidad.usuario;
          console.log('mensualidad', this.mensualidad);
          this.mensualidadForm.setValue(this.mensualidad);
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
    console.log(this.mensualidadForm.value);

    //Patch fechas
    this.fechaPago.patchValue(moment(this.fechaPago.value).format("DD/MM/YYYY"));

    if (this.data.accion == 'crear') {
      this.mensualidadForm.removeControl('idMensualidad');
      this._mensualidadService.createMensualidad(this.mensualidadForm.value).subscribe(
        (response: any) => {
          if (response) {
            console.warn(response);
            const modalInformation: Modal = {
              title: "Agregada",
              message: "La mensualidad se agregó correctamente",
              type: ModalType.confirmation,
              response: ModalResponse.success
            }
            this._uiActionsService.openConfirmationDialog(modalInformation);
            this.dialogRef.close();
            this.mensualidadForm.reset();
          }
        },
        (error) => {
          const modalInformation: Modal = {
            title: "Error",
            message: "Hubo un error al agregar la mensualidad, inténtelo de nuevo.",
            type: ModalType.confirmation,
            response: ModalResponse.failed
          }
          this._uiActionsService.openConfirmationDialog(modalInformation);
        }
      );
    } else {

    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}