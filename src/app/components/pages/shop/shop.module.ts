import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { CapitalizeFirstPipe } from '@pipes/capitalizefirst.pipe';
import { FriendService } from "@services/friend.service";
import { PouchDBService } from "@services/pouchdb.service";
@NgModule({
  declarations: [
CapitalizeFirstPipe,
    ShopComponent
  ],
  providers:[
    FriendService,
		PouchDBService
  ],

  imports: [
    CommonModule,
    NgxUsefulSwiperModule,
    ShopRoutingModule
  ]
})
export class ShopModule { }
