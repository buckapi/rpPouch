import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewproductRoutingModule } from './newproduct-routing.module';
import { NewproductComponent } from './newproduct.component';


@NgModule({
  declarations: [
    NewproductComponent
  ],
  imports: [
    CommonModule,
    NewproductRoutingModule
  ]
})
export class NewproductModule { }
