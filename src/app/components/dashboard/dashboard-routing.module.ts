import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';
import { TerrenosViewComponent } from './terrenos-view/terrenos-view.component';
import { AgregarTerrenoViewComponent } from './terrenos-view/agregar-terreno-view/agregar-terreno-view.component';


const routes: Routes = [
  { 
    path: '', 
    component: DashboardViewComponent ,
    children: [
      {
        path: 'terrenos',
        component: TerrenosViewComponent
      },
      {
        path: 'terrenos/agregar',
        component: AgregarTerrenoViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
