import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiCuentaRoutingModule } from './mi-cuenta-routing.module';
import { MiCuentaViewComponent } from './mi-cuenta-view/mi-cuenta-view.component';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiActionsService } from 'src/app/services/ui-actions.service';


@NgModule({
  declarations: [MiCuentaViewComponent],
  imports: [
    CommonModule,
    MiCuentaRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UiActionsService]
})
export class MiCuentaModule { }
