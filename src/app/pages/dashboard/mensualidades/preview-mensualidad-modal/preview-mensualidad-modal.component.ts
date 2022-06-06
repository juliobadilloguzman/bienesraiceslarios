import { Component, OnInit, Inject } from '@angular/core';
import { Mensualidad } from 'src/app/models/mensualidad';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-preview-mensualidad-modal',
  templateUrl: './preview-mensualidad-modal.component.html',
  styleUrls: ['./preview-mensualidad-modal.component.scss']
})
export class PreviewMensualidadModalComponent implements OnInit {

  mensualidad: Mensualidad;

  constructor(
    public dialogRef: MatDialogRef<PreviewMensualidadModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any) { }

  ngOnInit(): void {
    this.mensualidad = this.data['row'];
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
