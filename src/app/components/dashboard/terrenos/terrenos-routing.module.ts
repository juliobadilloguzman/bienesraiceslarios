import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TerrenosViewComponent } from './terrenos-view/terrenos-view.component';
import { AgregarTerrenoViewComponent } from './agregar-terreno-view/agregar-terreno-view.component';
import { MisTerrenosViewComponent } from './cliente/mis-terrenos-view/mis-terrenos-view.component';


const routes: Routes = [
  {
    path: '',
    component: TerrenosViewComponent
  },
  {
    path: 'agregar',
    component: AgregarTerrenoViewComponent
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
