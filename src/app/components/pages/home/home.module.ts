import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { InfiniteScrollModule } from "ngx-infinite-scroll";

import { LabcelhomeModule } from './labcelhome/labcelhome.module';
import { ClockModule } from '@pages/home/clock/clock.module';
@NgModule({
  declarations: [  
    HomeComponent
  ],
  imports: [
    ClockModule,
    CommonModule,
    LabcelhomeModule,
    HomeRoutingModule,
    NgxUsefulSwiperModule,
    InfiniteScrollModule
  ]
})
export class HomeModule { }
