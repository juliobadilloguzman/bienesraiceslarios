import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingViewComponent } from './landing-view/landing-view.component';
import { ServiceModalComponent } from './modals/service-modal/service-modal.component';
import { FraccionamientoModalComponent } from './modals/fraccionamiento-modal/fraccionamiento-modal.component';
import { VideoModalComponent } from './modals/video-modal/video-modal.component';


const routes: Routes = [
  { path: '', component: LandingViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  entryComponents: [ServiceModalComponent, FraccionamientoModalComponent, VideoModalComponent]
})
export class LandingRoutingModule { }
