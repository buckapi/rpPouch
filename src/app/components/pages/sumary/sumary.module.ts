import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SumaryRoutingModule } from './sumary-routing.module';
import { SumaryComponent } from './sumary.component';


@NgModule({
  declarations: [
    SumaryComponent
  ],
  imports: [
    CommonModule,
    SumaryRoutingModule
  ]
})
export class SumaryModule { }
