import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: DashboardViewComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'mi-cuenta',
        loadChildren: () => import('./mi-cuenta/mi-cuenta.module').then(m => m.MiCuentaModule)
      },
      {
        path: 'terrenos',
        loadChildren: () => import('./terrenos/terrenos.module').then(m => m.TerrenosModule)
      },
      {
        path: 'fraccionamientos',
        loadChildren: () => import('./fraccionamientos/fraccionamientos.module').then(m => m.FraccionamientosModule)
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule)
      },
      {
        path: 'mensualidades',
        loadChildren: () => import('./mensualidades/mensualidades.module').then(m => m.MensualidadesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
