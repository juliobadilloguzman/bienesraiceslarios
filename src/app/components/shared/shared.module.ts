import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { DashboardSidenavComponent } from './dashboard-sidenav/dashboard-sidenav.component';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [DashboardSidenavComponent, DashboardHeaderComponent],
  imports: [
    CommonModule,
    MaterialModule,
    NgbModule
  ],
  exports:[DashboardHeaderComponent, DashboardSidenavComponent]
})
export class SharedModule { }
