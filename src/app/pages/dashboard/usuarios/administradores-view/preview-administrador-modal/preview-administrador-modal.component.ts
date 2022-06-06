import { Component, OnInit, Inject } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-preview-administrador-modal',
  templateUrl: './preview-administrador-modal.component.html',
  styleUrls: ['./preview-administrador-modal.component.scss']
})
export class PreviewAdministradorModalComponent implements OnInit {

  /**
   * Current Administrador.
   *
   * @type {Usuario}
   * @memberof PreviewAdministradorModalComponent
   */
  administrador: Usuario;

  /**
   * Creates an instance of PreviewAdministradorModalComponent.
   * 
   * @param {MatDialogRef<PreviewAdministradorModalComponent>} dialogRef
   * @param {*} data
   * @memberof PreviewAdministradorModalComponent
   */
  constructor(public dialogRef: MatDialogRef<PreviewAdministradorModalComponent>,
              @Inject(MAT_DIALOG_DATA)
              public data: any
  ) { }

  /**
   * Angular OnInit life cycle hook.
   *
   * @memberof PreviewAdministradorModalComponent
   */
  ngOnInit(): void {
    this.administrador = this.data['administrador'];
  }

  /**
   * Closes the dialog.
   *
   * @memberof PreviewAdministradorModalComponent
   */
  closeDialog(): void{
    this.dialogRef.close();
  }

}
