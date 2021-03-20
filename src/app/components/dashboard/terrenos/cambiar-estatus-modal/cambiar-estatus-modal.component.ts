import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Form, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TerrenosService } from 'src/app/services/terrenos.service';
import { UiActionsService } from 'src/app/services/ui-actions.service';
import { ModalType, Modal, ModalResponse } from 'src/app/models/modal';

@Component({
  selector: 'app-cambiar-estatus-modal',
  templateUrl: './cambiar-estatus-modal.component.html',
  styleUrls: ['./cambiar-estatus-modal.component.scss']
})
export class CambiarEstatusModalComponent implements OnInit {

  estatusForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CambiarEstatusModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private _terrenosService: TerrenosService,
    private _uiActionsService: UiActionsService
  ) {

    this.estatusForm = this.fb.group({
      estatusTerreno: [null, Validators.required]
    });

  }

  get estatusTerreno(){
    return this.estatusForm.get('estatusTerreno') as FormControl;
  }

  ngOnInit(): void {

    this.estatusTerreno.patchValue(this.data.row.estatusTerreno);

  }

  onSubmitForm(){

    this._uiActionsService.showSpinner();

    this._terrenosService.changeStatus(this.data.row.idTerreno, this.estatusForm.value).subscribe(
      (response) => {


        if(response){

          this._uiActionsService.hideSpinner();

          const modalInformation: Modal = {
            title: "Editado",
            message: "Estatus cambiado satisfactoriamente",
            type: ModalType.confirmation,
            response: ModalResponse.success
          }
  
          this._uiActionsService.openConfirmationDialog(modalInformation);


          this.dialogRef.close({updated: true});

        }

      },
      (error) => {

        this._uiActionsService.hideSpinner();

        const modalInformation: Modal = {
          title: "Error",
          message: "Error al cambiar el terreno de estatus, verifique su conexión a internet e inténtelo de nuevo",
          type: ModalType.confirmation,
          response: ModalResponse.failed
        }

        this._uiActionsService.openConfirmationDialog(modalInformation);

      }
    );

  }

  closeDialog(){
    this.dialogRef.close();
  }

}
