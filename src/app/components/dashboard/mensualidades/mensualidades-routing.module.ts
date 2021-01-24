import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MensualidadesViewComponent } from './mensualidades-view/mensualidades-view.component';


const routes: Routes = [
  {
    path: '',
    component: MensualidadesViewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MensualidadesRoutingModule { }
