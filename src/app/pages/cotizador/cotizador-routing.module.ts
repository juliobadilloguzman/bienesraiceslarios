import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CotizadorViewComponent } from './cotizador-view/cotizador-view.component';

const routes: Routes = [
  {
    path: '',
    component: CotizadorViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CotizadorRoutingModule { }
