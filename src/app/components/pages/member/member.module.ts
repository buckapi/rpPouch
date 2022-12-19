import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { MemberComponent } from './member.component';
import { TicketService } from "@services/ticket.service";

import { PouchDBService } from "@services/pouchdb.service";

@NgModule({
  declarations: [
    MemberComponent
  ],
  providers:[
    TicketService,
    PouchDBService
  ],
  imports: [
    CommonModule,
    MemberRoutingModule
  ]
})
export class MemberModule { }
