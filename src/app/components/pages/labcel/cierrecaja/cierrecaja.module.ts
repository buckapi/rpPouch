import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CierrecajaRoutingModule } from './cierrecaja-routing.module';
import { CierrecajaComponent } from './cierrecaja.component';


@NgModule({
  declarations: [
    CierrecajaComponent
  ],
  imports: [
    CommonModule,
    CierrecajaRoutingModule
  ]
})
export class CierrecajaModule { }
