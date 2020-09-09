import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FraccionamientoLanding } from 'src/app/models/LandingPage/fraccionamiento-landing';

@Component({
  selector: 'app-fraccionamiento-modal',
  templateUrl: './fraccionamiento-modal.component.html',
  styleUrls: ['./fraccionamiento-modal.component.scss']
})
export class FraccionamientoModalComponent implements OnInit {

  fraccionamiento: FraccionamientoLanding;

  constructor(
    public dialogRef: MatDialogRef<FraccionamientoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FraccionamientoLanding) {}

  
  ngOnInit(): void {
    this.fraccionamiento=this.data['fraccionamiento'];
  }

  onCloseModal(): void {
    this.dialogRef.close();
  }

  goToExternalUrl(url: string){
    window.open(url, "_blank");
  }



}
