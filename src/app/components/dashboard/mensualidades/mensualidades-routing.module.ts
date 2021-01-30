import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MensualidadesViewComponent } from './mensualidades-view/mensualidades-view.component';
import { MisMensualidadesViewComponent } from './cliente/mis-mensualidades-view/mis-mensualidades-view.component';


const routes: Routes = [
  {
    path: '',
    component: MensualidadesViewComponent
  },
  {
    path: 'mis-mensualidades',
    component: MisMensualidadesViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MensualidadesRoutingModule { }
