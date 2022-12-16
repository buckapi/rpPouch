import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StylistsRoutingModule } from './stylists-routing.module';
import { StylistsComponent } from './stylists.component';

import { StylistService } from "@services/stylist.service";
import { FriendService } from "@services/friend.service";
import { PouchDBService } from "@services/pouchdb.service";
@NgModule({
  declarations: [
    StylistsComponent
  ],
    providers:[
    StylistService,
    FriendService,
    PouchDBService
  ],
  imports: [
    CommonModule,
    StylistsRoutingModule
  ]
})
export class StylistsModule { }
