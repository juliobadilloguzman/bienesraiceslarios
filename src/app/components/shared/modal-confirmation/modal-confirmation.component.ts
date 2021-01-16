import { Component, OnInit, Inject } from '@angular/core';
import { Modal } from 'src/app/models/modal';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.scss']
})
export class ModalConfirmationComponent implements OnInit {

  modalInformation: Modal;

  constructor(public dialogRef: MatDialogRef<ModalConfirmationComponent>, @Inject(MAT_DIALOG_DATA) public data: Modal, private router: Router) { }

  ngOnInit(): void {
    this.modalInformation = this.data['modalInformation'];
  }

  closeDialog() {

    this.dialogRef.close();

    //Redirect if necessary
    if (this.modalInformation.redirectTo) {
      this.router.navigateByUrl(this.modalInformation.redirectTo);
    }

  }

}
