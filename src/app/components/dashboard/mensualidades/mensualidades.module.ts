import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MensualidadesRoutingModule } from './mensualidades-routing.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MensualidadesViewComponent } from './mensualidades-view/mensualidades-view.component';
import { PreviewMensualidadModalComponent } from './preview-mensualidad-modal/preview-mensualidad-modal.component';
import { CreateUpdateMensualidadModalComponent } from './create-update-mensualidad-modal/create-update-mensualidad-modal.component';
import { YesNoModalComponent } from '../../shared/yes-no-modal/yes-no-modal.component';
import { ModalConfirmationComponent } from '../../shared/modal-confirmation/modal-confirmation.component';
import { UiActionsService } from 'src/app/services/ui-actions.service';
import { MisMensualidadesViewComponent } from './cliente/mis-mensualidades-view/mis-mensualidades-view.component';


@NgModule({
  entryComponents: [PreviewMensualidadModalComponent, YesNoModalComponent, ModalConfirmationComponent, CreateUpdateMensualidadModalComponent, ModalConfirmationComponent],
  declarations: [MensualidadesViewComponent, PreviewMensualidadModalComponent, CreateUpdateMensualidadModalComponent, MisMensualidadesViewComponent],
  imports: [
    CommonModule,
    MensualidadesRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [UiActionsService, CurrencyPipe]
})
export class MensualidadesModule { }
