import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-fraccionamiento-modal',
  templateUrl: './fraccionamiento-modal.component.html',
  styleUrls: ['./fraccionamiento-modal.component.scss']
})
export class FraccionamientoModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FraccionamientoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
  }

  onCloseModal(): void {
    this.dialogRef.close();
  }

}
