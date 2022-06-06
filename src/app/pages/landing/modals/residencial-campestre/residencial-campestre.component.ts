import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-residencial-campestre',
  templateUrl: './residencial-campestre.component.html',
  styleUrls: ['./residencial-campestre.component.scss']
})
export class ResidencialCampestreComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ResidencialCampestreComponent>,
  ) { }

  ngOnInit(): void {
  }

  onCloseModal(): void {
    this.dialogRef.close();
  }

  goToExternalUrl(url: string){
    window.open(url, "_blank");
  }

}
