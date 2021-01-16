import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalConfirmationComponent } from '../components/shared/modal-confirmation/modal-confirmation.component';
import { YesNoModalComponent } from '../components/shared/yes-no-modal/yes-no-modal.component';

@Injectable({
  providedIn: 'root'
})
export class UiActionsService {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private _snackBar: MatSnackBar, private dialog: MatDialog) { }

  presentSnackBar(message: string, action: string, duration?: number) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
  }

  openConfirmationDialog(modalInformation: any): MatDialogRef<ModalConfirmationComponent> {

    const dialog_ref = this.dialog.open(ModalConfirmationComponent, {
      height: '300px',
      width: '500px',
      data: {
        modalInformation
      }
    });

    return dialog_ref;

  }

  openYesNoDialog(modalInformation: any): MatDialogRef<YesNoModalComponent> {

    const dialog_ref = this.dialog.open(YesNoModalComponent, {
      height: '300px',
      width: '500px',
      data: {
        modalInformation
      }
    });

    return dialog_ref;

  }

}

