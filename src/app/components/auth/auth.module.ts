import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginViewComponent } from './login-view/login-view.component';
import { MaterialModule } from 'src/app/shared/material.module';


@NgModule({
  declarations: [LoginViewComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule
  ]
})
export class AuthModule { }
