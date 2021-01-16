import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TerrenosRoutingModule } from './terrenos-routing.module';
import { TerrenosViewComponent } from './terrenos-view/terrenos-view.component';


@NgModule({
  declarations: [TerrenosViewComponent],
  imports: [
    CommonModule,
    TerrenosRoutingModule
  ]
})
export class TerrenosModule { }
