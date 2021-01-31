import { Component, OnInit, Inject } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-preview-administrador-modal',
  templateUrl: './preview-administrador-modal.component.html',
  styleUrls: ['./preview-administrador-modal.component.scss']
})
export class PreviewAdministradorModalComponent implements OnInit {

  administrador: Usuario;

  constructor(
    public dialogRef: MatDialogRef<PreviewAdministradorModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) { }

  ngOnInit(): void {
    this.administrador = this.data['row'];
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
