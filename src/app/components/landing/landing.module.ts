import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingViewComponent } from './landing-view/landing-view.component';
import { MaterialModule } from 'src/app/shared/material.module';


@NgModule({
  declarations: [LandingViewComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    MaterialModule
  ]
})
export class LandingModule { }
