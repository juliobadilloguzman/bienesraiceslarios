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
  urlUbicacion = `https://www.google.com/maps/place/18%C2%B052'08.0%22N+98%C2%B052'20.4%22W/@18.865316,-98.8727917,16z/data=!4m5!3m4!1s0x0:0x0!8m2!3d18.8688831!4d-98.8723373?hl=es`;

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
