import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopsRoutingModule } from './shops-routing.module';
import { ShopsComponent } from './shops.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { CapitalizeSecondPipe } from '@pipes/capitalizesecond.pipe';
@NgModule({
  declarations: [
 CapitalizeSecondPipe,
    ShopsComponent
  ],
  imports: [
    NgxUsefulSwiperModule,
    CommonModule,
    ShopsRoutingModule
  ]
})
export class ShopsModule { }
