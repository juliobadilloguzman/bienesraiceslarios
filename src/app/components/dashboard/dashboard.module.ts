import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { TerrenosViewComponent } from './terrenos-view/terrenos-view.component';
import { AgregarTerrenoViewComponent } from './terrenos-view/agregar-terreno-view/agregar-terreno-view.component';


@NgModule({
  declarations: [DashboardViewComponent, TerrenosViewComponent, AgregarTerrenoViewComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class DashboardModule { }
