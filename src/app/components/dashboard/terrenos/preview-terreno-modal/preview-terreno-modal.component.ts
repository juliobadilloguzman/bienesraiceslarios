import { Component, OnInit, Inject } from '@angular/core';
import { Terreno } from 'src/app/models/terreno';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-preview-terreno-modal',
  templateUrl: './preview-terreno-modal.component.html',
  styleUrls: ['./preview-terreno-modal.component.scss']
})
export class PreviewTerrenoModalComponent implements OnInit {

  terreno: Terreno;

  constructor(
    public dialogRef: MatDialogRef<PreviewTerrenoModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any) { }

  ngOnInit(): void {
    this.terreno = this.data['row'];
    console.warn(this.terreno);
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
