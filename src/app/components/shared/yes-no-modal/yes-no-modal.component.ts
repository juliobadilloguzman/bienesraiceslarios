import { Component, OnInit, Inject } from '@angular/core';
import { Modal } from 'src/app/models/modal';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-yes-no-modal',
  templateUrl: './yes-no-modal.component.html',
  styleUrls: ['./yes-no-modal.component.scss']
})
export class YesNoModalComponent implements OnInit {

  modalInformation: Modal;

  constructor(public dialogRef: MatDialogRef<YesNoModalComponent>, @Inject(MAT_DIALOG_DATA) public data: Modal, private router: Router) { }

  ngOnInit(): void {
    this.modalInformation = this.data['modalInformation'];
  }

  closeDialog(action?: string) {

    if (action == 'confirm')
      this.dialogRef.close('confirm');
    else
      this.dialogRef.close();

    //Redirect if necessary
    if (this.modalInformation.redirectTo) {
      this.router.navigateByUrl(this.modalInformation.redirectTo);
    }

  }

  srcResponse(response): string {
    switch (response) {
      case 'failed':
        return '/assets/img/icons/others/failed.svg';
        break;

      case 'success':
        return '/assets/img/icons/others/success.svg';
        break;

      case 'warning':
        return '/assets/img/icons/others/warning.png'
        break;

      default:
        break;
    }
  }

}
