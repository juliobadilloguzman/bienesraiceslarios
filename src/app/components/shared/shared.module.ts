import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { MaterialModule } from 'src/app/shared/material.module';



@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[MenuComponent]
})
export class SharedModule { }
