import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromosRoutingModule } from './promos-routing.module';
import { PromosComponent } from './promos.component';


@NgModule({
  declarations: [
    PromosComponent
  ],
  imports: [
    CommonModule,
    PromosRoutingModule
  ]
})
export class PromosModule { }
