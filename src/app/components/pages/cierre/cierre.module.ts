import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CierreRoutingModule } from './cierre-routing.module';
import { CierreComponent } from './cierre.component';
import { CloseService } from "@services/close.service";

import { PouchDBService } from "@services/pouchdb.service";
import { TicketService } from "@services/ticket.service";

import { StylistService } from "@services/stylist.service";
@NgModule({
  declarations: [
    CierreComponent
  ],
 providers:[
    StylistService,
   TicketService,
    CloseService,
    PouchDBService
  ],
  imports: [
    CommonModule,
    CierreRoutingModule
  ]
})
export class CierreModule { }
