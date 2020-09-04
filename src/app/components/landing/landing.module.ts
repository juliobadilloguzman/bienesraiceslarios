import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingViewComponent } from './landing-view/landing-view.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { ServiceModalComponent } from './modals/service-modal/service-modal.component';
import { FraccionamientoModalComponent } from './modals/fraccionamiento-modal/fraccionamiento-modal.component';
import { GoogleMapsModule } from '@angular/google-maps'
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LandingViewComponent, ServiceModalComponent, FraccionamientoModalComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    MaterialModule,
    GoogleMapsModule,
    SharedModule
  ]
})
export class LandingModule { }
