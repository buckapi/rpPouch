import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CloselistRoutingModule } from './closelist-routing.module';
import { CloselistComponent } from './closelist.component';
import { CloseService } from "@services/close.service";

import { PouchDBService } from "@services/pouchdb.service";


@NgModule({
  declarations: [
    CloselistComponent
  ],
 providers:[
    CloseService,
    PouchDBService
  ],
  imports: [
    CommonModule,
    CloselistRoutingModule
  ]
})
export class CloselistModule { }
