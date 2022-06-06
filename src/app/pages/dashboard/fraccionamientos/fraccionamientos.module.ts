import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FraccionamientosRoutingModule } from './fraccionamientos-routing.module';
import { FraccionamientosViewComponent } from './fraccionamientos-view/fraccionamientos-view.component';
import { PreviewFraccionamientoModalComponent } from './preview-fraccionamiento-modal/preview-fraccionamiento-modal.component';
import { CreateUpdateFraccionamientoModalComponent } from './create-update-fraccionamiento-modal/create-update-fraccionamiento-modal.component';
import { UiActionsService } from 'src/app/services/ui-actions.service';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalConfirmationComponent } from '../../shared/modal-confirmation/modal-confirmation.component';
import { YesNoModalComponent } from '../../shared/yes-no-modal/yes-no-modal.component';


@NgModule({
  entryComponents: [CreateUpdateFraccionamientoModalComponent, PreviewFraccionamientoModalComponent, ModalConfirmationComponent, YesNoModalComponent],
  declarations: [FraccionamientosViewComponent, PreviewFraccionamientoModalComponent, CreateUpdateFraccionamientoModalComponent],
  imports: [
    CommonModule,
    FraccionamientosRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UiActionsService]
})
export class FraccionamientosModule { }
