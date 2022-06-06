import { Component, OnInit, Inject } from '@angular/core';
import { Fraccionamiento } from 'src/app/models/fraccionamiento';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-preview-fraccionamiento-modal',
  templateUrl: './preview-fraccionamiento-modal.component.html',
  styleUrls: ['./preview-fraccionamiento-modal.component.scss']
})
export class PreviewFraccionamientoModalComponent implements OnInit {

  fraccionamiento: Fraccionamiento;

  constructor(
    public dialogRef: MatDialogRef<PreviewFraccionamientoModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any) { }

  ngOnInit(): void {
    this.fraccionamiento = this.data['row'];
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
