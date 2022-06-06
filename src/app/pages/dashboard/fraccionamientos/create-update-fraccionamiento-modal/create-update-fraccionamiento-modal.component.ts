import { Component, OnInit, Inject } from '@angular/core';
import { Fraccionamiento } from 'src/app/models/fraccionamiento';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UiActionsService } from 'src/app/services/ui-actions.service';
import { FraccionamientosService } from 'src/app/services/fraccionamientos.service';
import { Modal, ModalType, ModalResponse } from 'src/app/models/modal';
import { Estatus } from 'src/app/models/estatus.enum';
import { Action } from 'src/app/models/action.enum';

@Component({
  selector: 'app-create-update-fraccionamiento-modal',
  templateUrl: './create-update-fraccionamiento-modal.component.html',
  styleUrls: ['./create-update-fraccionamiento-modal.component.scss']
})
export class CreateUpdateFraccionamientoModalComponent implements OnInit {

  /**
   * Form to create a Fraccionamiento.
   *
   * @type {FormGroup}
   * @memberof CreateUpdateFraccionamientoModalComponent
   */
  fraccionamientoForm: FormGroup;

  /**
   * Current Fraccionamiento if it is editing.
   *
   * @type {Fraccionamiento}
   * @memberof CreateUpdateFraccionamientoModalComponent
   */
  fraccionamiento: Fraccionamiento;

  /**
   * Creates an instance of CreateUpdateFraccionamientoModalComponent.
   * 
   * @param {MatDialogRef<CreateUpdateFraccionamientoModalComponent>} dialogRef
   * @param {*} data
   * @param {FraccionamientosService} _fraccionamientosService
   * @param {FormBuilder} fb
   * @param {UiActionsService} _uiActionsService
   * @memberof CreateUpdateFraccionamientoModalComponent
   */
  constructor(public dialogRef: MatDialogRef<CreateUpdateFraccionamientoModalComponent>,
              @Inject(MAT_DIALOG_DATA)
              public data: any,
              private _fraccionamientosService: FraccionamientosService,
              private fb: FormBuilder,
              private _uiActionsService: UiActionsService) {

    this.fraccionamientoForm = this.fb.group({
      idFraccionamiento: [],
      nombre: ['', [Validators.required, Validators.pattern(/^([A-Za-z0-9\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/)]],
      regimen: [null, [Validators.required]],
      municipio: [null, [Validators.required]],
      estado: ['Morelos', [Validators.required]],
      ubicacionMaps: [null],
      estatusFraccionamiento: [Estatus.ACTIVO]
    });

  }

  /**
   * Returns the idFraccionamiento as Form Control.
   *
   * @readonly
   * @memberof CreateUpdateFraccionamientoModalComponent
   */
  get idFraccionamiento() {
    return this.fraccionamientoForm.get('idFraccionamiento') as FormControl;
  }

  /**
   * Returns the nombre as Form Control.
   *
   * @readonly
   * @memberof CreateUpdateFraccionamientoModalComponent
   */
  get nombre() {
    return this.fraccionamientoForm.get('nombre') as FormControl;
  }

  /**
   * Returns the regimen as Form Control.
   *
   * @readonly
   * @memberof CreateUpdateFraccionamientoModalComponent
   */
  get regimen() {
    return this.fraccionamientoForm.get('regimen') as FormControl;
  }

  /**
   * Returns the municipio as Form Control.
   *
   * @readonly
   * @memberof CreateUpdateFraccionamientoModalComponent
   */
  get municipio() {
    return this.fraccionamientoForm.get('municipio') as FormControl;
  }

  /**
   * Returns the estado as Form Control.
   *
   * @readonly
   * @memberof CreateUpdateFraccionamientoModalComponent
   */
  get estado() {
    return this.fraccionamientoForm.get('estado') as FormControl;
  }

  /**
   * Returns the ubicacion as Form Control.
   *
   * @readonly
   * @memberof CreateUpdateFraccionamientoModalComponent
   */
  get ubicacionMaps() {
    return this.fraccionamientoForm.get('ubicacionMaps') as FormControl;
  }

  /**
   * Returns the estatus fraccionamiento as Form Control.
   *
   * @readonly
   * @memberof CreateUpdateFraccionamientoModalComponent
   */
  get estatusFraccionamiento() {
    return this.fraccionamientoForm.get('estatusFraccionamiento') as FormControl;
  }

  /**
   * Angular OnInit life cycle hook.
   *
   * @return {*}  {Promise<void>}
   * @memberof CreateUpdateFraccionamientoModalComponent
   */
  async ngOnInit(): Promise<void> {

    if (this.data.accion == Action.EDITAR) {

      this._uiActionsService.showSpinner();

      try{

        const fraccionamiento: Fraccionamiento = await this._fraccionamientosService.getFraccionamiento(this.data.fraccionamiento.idFraccionamiento).toPromise();

        this.fraccionamientoForm.setValue(fraccionamiento);

      }catch(error){

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
   * Shows the error of the Form.
   *
   * @param {FormControl} control
   * @return {*}  {boolean}
   * @memberof CreateUpdateFraccionamientoModalComponent
   */
  showErrors(control: FormControl): boolean {

    const { dirty, touched, errors } = control;
    return dirty && touched && !!errors;

  }

  /**
   * Submits the form.
   *
   * @return {*}  {Promise<void>}
   * @memberof CreateUpdateFraccionamientoModalComponent
   */
  async onSubmitForm(): Promise<void> {

    this._uiActionsService.showSpinner();

    if (this.data.accion == Action.CREAR) {

      try{

        this.fraccionamientoForm.removeControl('idFraccionamiento');

        await this._fraccionamientosService.createFraccionamiento(this.fraccionamientoForm.value).toPromise();

        const modalInformation: Modal = {
          title: "Creado",
          message: "El fraccionamiento se creo correctamente",
          type: ModalType.confirmation,
          response: ModalResponse.success
        }

        this._uiActionsService.openConfirmationDialog(modalInformation);
        this.dialogRef.close();
        this.fraccionamientoForm.reset();

      }catch(error){

        const modalInformation: Modal = {
          title: "Error",
          message: "Hubo un error al crear el fraccionamiento, inténtelo de nuevo.",
          type: ModalType.confirmation,
          response: ModalResponse.failed
        }

        this._uiActionsService.openConfirmationDialog(modalInformation);
        
      }finally{
        this._uiActionsService.hideSpinner();
      }

      
    } 
    
    
    if (this.data.accion == Action.EDITAR) {

      try{

        await this._fraccionamientosService.updateFraccionamiento(this.fraccionamientoForm.value).toPromise();

        const modalInformation: Modal = {
          title: "Editado",
          message: "El fraccionamiento se editó correctamente",
          type: ModalType.confirmation,
          response: ModalResponse.success
        }

        this._uiActionsService.openConfirmationDialog(modalInformation);

        this.dialogRef.close();

      }catch(error){

        const modalInformation: Modal = {
          title: "Error",
          message: "Hubo un error al editar el fraccionamiento, inténtelo de nuevo.",
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
   * @memberof CreateUpdateFraccionamientoModalComponent
   */
  closeDialog() {
    this.dialogRef.close();
  }

}
