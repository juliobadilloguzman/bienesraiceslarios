import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendedoresViewComponent } from './vendedores-view/vendedores-view.component';
import { ClientesViewComponent } from './clientes-view/clientes-view.component';
import { AdministradoresViewComponent } from './administradores-view/administradores-view.component';
import { CapturistasViewComponent } from './capturistas-view/capturistas-view.component';


const routes: Routes = [
  {
    path: 'vendedores',
    component: VendedoresViewComponent
  },
  {
    path: 'clientes',
    component: ClientesViewComponent
  },
  {
    path: 'administradores',
    component: AdministradoresViewComponent
  },
  {
    path: 'capturistas',
    component: CapturistasViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
