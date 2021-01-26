import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TerrenosRoutingModule } from './terrenos-routing.module';
import { TerrenosViewComponent } from './terrenos-view/terrenos-view.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgregarTerrenoViewComponent } from './agregar-terreno-view/agregar-terreno-view.component';
import { YesNoModalComponent } from '../../shared/yes-no-modal/yes-no-modal.component';
import { ModalConfirmationComponent } from '../../shared/modal-confirmation/modal-confirmation.component';
import { UiActionsService } from 'src/app/services/ui-actions.service';
import { CreateUpdateVendedorModalComponent } from '../usuarios/vendedores-view/create-update-vendedor-modal/create-update-vendedor-modal.component';
import { ConfirmAgregarTerrenoModalComponent } from './confirm-agregar-terreno-modal/confirm-agregar-terreno-modal.component';
import { CreateUpdateClienteModalComponent } from '../usuarios/clientes-view/create-update-cliente-modal/create-update-cliente-modal.component';


@NgModule({
  entryComponents: [ModalConfirmationComponent, YesNoModalComponent, CreateUpdateVendedorModalComponent, ConfirmAgregarTerrenoModalComponent, CreateUpdateClienteModalComponent],
  declarations: [TerrenosViewComponent, AgregarTerrenoViewComponent, ConfirmAgregarTerrenoModalComponent],
  imports: [
    CommonModule,
    TerrenosRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UiActionsService]
})
export class TerrenosModule { }