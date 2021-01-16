import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { VendedoresViewComponent } from './vendedores-view/vendedores-view.component';
import { ClientesViewComponent } from './clientes-view/clientes-view.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/material.module';
import { CreateUpdateVendedorModalComponent } from './vendedores-view/create-update-vendedor-modal/create-update-vendedor-modal.component';
import { ModalConfirmationComponent } from '../../shared/modal-confirmation/modal-confirmation.component';
import { UiActionsService } from 'src/app/services/ui-actions.service';
import { YesNoModalComponent } from '../../shared/yes-no-modal/yes-no-modal.component';
import { PreviewVendedorModalComponent } from './vendedores-view/preview-vendedor-modal/preview-vendedor-modal.component';


@NgModule({
  entryComponents: [CreateUpdateVendedorModalComponent, ModalConfirmationComponent, YesNoModalComponent, PreviewVendedorModalComponent],
  declarations: [VendedoresViewComponent, ClientesViewComponent, CreateUpdateVendedorModalComponent, PreviewVendedorModalComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule
  ],
  providers: [UiActionsService]
})
export class UsuariosModule { }
