import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FraccionamientosRoutingModule } from './fraccionamientos-routing.module';
import { FraccionamientosViewComponent } from './fraccionamientos-view/fraccionamientos-view.component';


@NgModule({
  declarations: [FraccionamientosViewComponent],
  imports: [
    CommonModule,
    FraccionamientosRoutingModule
  ]
})
export class FraccionamientosModule { }
