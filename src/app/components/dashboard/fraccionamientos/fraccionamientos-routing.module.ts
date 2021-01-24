import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FraccionamientosViewComponent } from './fraccionamientos-view/fraccionamientos-view.component';


const routes: Routes = [
  {
    path: '',
    component: FraccionamientosViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FraccionamientosRoutingModule { }
