import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MiCuentaViewComponent } from './mi-cuenta-view/mi-cuenta-view.component';


const routes: Routes = [
  {
    path: '',
    component: MiCuentaViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiCuentaRoutingModule { }
