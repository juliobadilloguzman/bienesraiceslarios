import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingViewComponent } from './landing-view/landing-view.component';
import { ServiceModalComponent } from './modals/service-modal/service-modal.component';
import { FraccionamientoModalComponent } from './modals/fraccionamiento-modal/fraccionamiento-modal.component';
import { VideoModalComponent } from './modals/video-modal/video-modal.component';
import { PlanoInteractivoComponent } from './plano-interactivo/plano-interactivo.component';


const routes: Routes = [
  { path: '', component: LandingViewComponent },
  { path: 'plano', component: PlanoInteractivoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  entryComponents: [ServiceModalComponent, FraccionamientoModalComponent, VideoModalComponent]
})
export class LandingRoutingModule { }
