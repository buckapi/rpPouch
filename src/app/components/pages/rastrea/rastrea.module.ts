import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RastreaRoutingModule } from './rastrea-routing.module';
import { RastreaComponent } from './rastrea.component';


@NgModule({
  declarations: [
    RastreaComponent
  ],
  imports: [
    CommonModule,
    RastreaRoutingModule
  ]
})
export class RastreaModule { }
