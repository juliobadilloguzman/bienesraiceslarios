import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-preview-cliente-modal',
  templateUrl: './preview-cliente-modal.component.html',
  styleUrls: ['./preview-cliente-modal.component.scss']
})
export class PreviewClienteModalComponent implements OnInit {

  cliente: Usuario;

  constructor(
    public dialogRef: MatDialogRef<PreviewClienteModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) { }

  ngOnInit(): void {
    this.cliente = this.data['row'];
    console.warn(this.cliente);
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
