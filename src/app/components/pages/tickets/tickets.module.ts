import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets.component';
import { TicketService } from "@services/ticket.service";

import { PouchDBService } from "@services/pouchdb.service";

@NgModule({
  declarations: [
    TicketsComponent
  ],
   providers:[
    TicketService,
    PouchDBService
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule
  ]
})
export class TicketsModule { }
