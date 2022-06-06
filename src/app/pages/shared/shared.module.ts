import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { DashboardSidenavComponent } from './dashboard-sidenav/dashboard-sidenav.component';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfirmationComponent } from './modal-confirmation/modal-confirmation.component';
import { YesNoModalComponent } from './yes-no-modal/yes-no-modal.component';

@NgModule({
  declarations: [DashboardSidenavComponent, DashboardHeaderComponent, ModalConfirmationComponent, YesNoModalComponent],
  imports: [
    CommonModule,
    MaterialModule,
    NgbModule
  ],
  exports: [DashboardHeaderComponent, DashboardSidenavComponent, ModalConfirmationComponent, YesNoModalComponent]
})
export class SharedModule { }
