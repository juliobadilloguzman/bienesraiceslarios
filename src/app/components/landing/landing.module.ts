import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingViewComponent } from './landing-view/landing-view.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { ServiceModalComponent } from './modals/service-modal/service-modal.component';
import { FraccionamientoModalComponent } from './modals/fraccionamiento-modal/fraccionamiento-modal.component';
import { GoogleMapsModule } from '@angular/google-maps'
import { SharedModule } from '../shared/shared.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { VideoModalComponent } from './modals/video-modal/video-modal.component';

@NgModule({
  declarations: [LandingViewComponent, ServiceModalComponent, FraccionamientoModalComponent, VideoModalComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    MaterialModule,
    GoogleMapsModule,
    SharedModule,
    CarouselModule
  ]
})
export class LandingModule { }
