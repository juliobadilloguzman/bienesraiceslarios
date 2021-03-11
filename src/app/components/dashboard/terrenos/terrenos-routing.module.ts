import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TerrenosViewComponent } from './terrenos-view/terrenos-view.component';
import { MisTerrenosViewComponent } from './cliente/mis-terrenos-view/mis-terrenos-view.component';
import { AgregarEditarTerrenoViewComponent } from './agregar-editar-terreno-view/agregar-editar-terreno-view.component';


const routes: Routes = [
  {
    path: '',
    component: TerrenosViewComponent
  },
  {
    path: 'agregar',
    component: AgregarEditarTerrenoViewComponent,
    data: {accion: 'agregar'}
  },
  {
    path: 'editar',
    component: AgregarEditarTerrenoViewComponent,
    data: {acction: 'editar'}
  },
  {
    path: 'mis-terrenos',
    component: MisTerrenosViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TerrenosRoutingModule { }
