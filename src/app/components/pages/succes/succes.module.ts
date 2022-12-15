import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuccesRoutingModule } from './succes-routing.module';
import { SuccesComponent } from './succes.component';


@NgModule({
  declarations: [
    SuccesComponent
  ],
  imports: [
    CommonModule,
    SuccesRoutingModule
  ]
})
export class SuccesModule { }
