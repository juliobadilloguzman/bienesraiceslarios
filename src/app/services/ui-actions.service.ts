import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalConfirmationComponent } from '../pages/shared/modal-confirmation/modal-confirmation.component';
import { YesNoModalComponent } from '../pages/shared/yes-no-modal/yes-no-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class UiActionsService {

  /**
   * Horizontal position.
   *
   * @private
   * @type {MatSnackBarHorizontalPosition}
   * @memberof UiActionsService
   */
  private readonly horizontalPosition: MatSnackBarHorizontalPosition = 'center';

  /**
   * Vertical psoition.
   *
   * @private
   * @type {MatSnackBarVerticalPosition}
   * @memberof UiActionsService
   */
  private readonly verticalPosition: MatSnackBarVerticalPosition = 'top';

  /**
   * Creates an instance of UiActionsService.
   * 
   * @param {MatSnackBar} _snackBar
   * @param {MatDialog} dialog
   * @param {NgxSpinnerService} spinner
   * @memberof UiActionsService
   */
  constructor(private _snackBar: MatSnackBar,
              private dialog: MatDialog,
              private spinner: NgxSpinnerService) { }
  
  /**
   * Presents a snackbac.
   *
   * @param {string} message
   * @param {string} action
   * @param {number} [duration]
   * @memberof UiActionsService
   */
  presentSnackBar(message: string, action: string, duration?: number): void{

    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
    
  }

  /**
   * Opens the confirmation dialog.
   *
   * @param {*} modalInformation
   * @return {*}  {MatDialogRef<ModalConfirmationComponent>}
   * @memberof UiActionsService
   */
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

  /**
   * Open yes-no dialog.
   *
   * @param {*} modalInformation
   * @return {*}  {MatDialogRef<YesNoModalComponent>}
   * @memberof UiActionsService
   */
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

  /**
   * Shows a the spinner.
   *
   * @memberof UiActionsService
   */
  showSpinner(){
    this.spinner.show();
  }

  /**
   * Hides the spinner.
   *
   * @memberof UiActionsService
   */
  hideSpinner(){
    this.spinner.hide();
  }

}

