import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { CotizadorRoutingModule } from './cotizador-routing.module';
import { CotizadorViewComponent } from './cotizador-view/cotizador-view.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UiActionsService } from 'src/app/services/ui-actions.service';


@NgModule({
  declarations: [CotizadorViewComponent],
  imports: [
    CommonModule,
    CotizadorRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [UiActionsService, CurrencyPipe]
})
export class CotizadorModule { }
