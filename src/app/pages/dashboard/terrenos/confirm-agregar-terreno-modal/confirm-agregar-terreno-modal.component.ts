import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/models/usuario';
import { FraccionamientosService } from 'src/app/services/fraccionamientos.service';
import { Fraccionamiento } from 'src/app/models/fraccionamiento';
import { FormControl } from '@angular/forms';
import { Modal, ModalType, ModalResponse } from 'src/app/models/modal';
import { UiActionsService } from 'src/app/services/ui-actions.service';

@Component({
  selector: 'app-confirm-agregar-terreno-modal',
  templateUrl: './confirm-agregar-terreno-modal.component.html',
  styleUrls: ['./confirm-agregar-terreno-modal.component.scss']
})
export class ConfirmAgregarTerrenoModalComponent implements OnInit {

  fraccionamiento: Fraccionamiento;

  showSaldoInput: boolean = false;
  saldoCtrl: FormControl = new FormControl();

  /**
   * Creates an instance of ConfirmAgregarTerrenoModalComponent.
   * 
   * @param {MatDialogRef<ConfirmAgregarTerrenoModalComponent>} dialogRef
   * @param {*} data
   * @param {FraccionamientosService} fraccionamientosService
   * @param {UiActionsService} uiActionsService
   * @memberof ConfirmAgregarTerrenoModalComponent
   */
  constructor(public dialogRef: MatDialogRef<ConfirmAgregarTerrenoModalComponent>,
              @Inject(MAT_DIALOG_DATA)
              public data: any,
              private fraccionamientosService: FraccionamientosService,
              private uiActionsService: UiActionsService) { }

  /**
   * Angular OnInit life cycle hook.
   *
   * @return {*}  {Promise<void>}
   * @memberof ConfirmAgregarTerrenoModalComponent
   */
  async ngOnInit(): Promise<void> {

    await this.getFraccionamiento();

  }

  /**
   * Gets a Fraccionamiento.
   * 
   *
   * @return {*}  {Promise<void>}
   * @memberof ConfirmAgregarTerrenoModalComponent
   */
  async getFraccionamiento(): Promise<void> {

    try{

      const fraccionamiento: Fraccionamiento = await this.fraccionamientosService.getFraccionamiento(this.data.form.fraccionamientoIdFraccionamiento).toPromise();

      this.fraccionamiento = fraccionamiento;

    }catch{

      const modalInformation: Modal = {
        title: "Error",
        message: "Error al cargar la informacion, verifique su conexion a internet e inténtelo de nuevo",
        type: ModalType.confirmation,
        response: ModalResponse.failed
      }

      this.uiActionsService.openConfirmationDialog(modalInformation);

    }finally{
      
    }

  }

  /**
   * Allows modifying the saldo.
   *
   * @memberof ConfirmAgregarTerrenoModalComponent
   */
  modifySaldo(): void{
    this.showSaldoInput = true;
  }

  /**
   * Shows/Hide new saldo.
   *
   * @memberof ConfirmAgregarTerrenoModalComponent
   */
  cancelNewSaldo(): void{
    this.showSaldoInput = false;
  }

  /**
   * Closes the Dialog.
   *
   * @param {string} [action]
   * @memberof ConfirmAgregarTerrenoModalComponent
   */
  closeDialog(action?: string): void{

    if (this.showSaldoInput) {
      this.data.form.saldo = this.saldoCtrl.value;
    }

    if (action) {
      this.dialogRef.close({ action: action, form: this.data.form });
    } else {
      this.dialogRef.close();
    }

  }

}
