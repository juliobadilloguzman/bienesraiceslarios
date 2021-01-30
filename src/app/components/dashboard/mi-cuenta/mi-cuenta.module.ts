import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiCuentaRoutingModule } from './mi-cuenta-routing.module';
import { MiCuentaViewComponent } from './mi-cuenta-view/mi-cuenta-view.component';


@NgModule({
  declarations: [MiCuentaViewComponent],
  imports: [
    CommonModule,
    MiCuentaRoutingModule
  ]
})
export class MiCuentaModule { }
