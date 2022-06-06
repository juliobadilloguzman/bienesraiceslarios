import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceLanding } from 'src/app/models/LandingPage/service-landing';

@Component({
  selector: 'app-service-modal',
  templateUrl: './service-modal.component.html',
  styleUrls: ['./service-modal.component.scss']
})
export class ServiceModalComponent implements OnInit {

  servicio: ServiceLanding;

  constructor(
    public dialogRef: MatDialogRef<ServiceModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ServiceLanding) {}

  ngOnInit(): void {
    this.servicio = this.data['servicio'];
  }

  onCloseModal(): void {
    this.dialogRef.close();
  }

}
