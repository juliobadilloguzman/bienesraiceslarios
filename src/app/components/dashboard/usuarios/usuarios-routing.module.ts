import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendedoresViewComponent } from './vendedores-view/vendedores-view.component';


const routes: Routes = [
  {
    path: 'vendedores',
    component: VendedoresViewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
