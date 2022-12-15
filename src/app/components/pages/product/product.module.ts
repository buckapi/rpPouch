import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { FormsModule } from '@angular/forms'; 
@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
  FormsModule,
  NgxUsefulSwiperModule,
    CommonModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
