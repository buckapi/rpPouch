import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SumaryRoutingModule } from './sumary-routing.module';
import { SumaryComponent } from './sumary.component';
import { TicketService } from "@services/ticket.service";
import { PouchDBService } from "@services/pouchdb.service";
@NgModule({
  declarations: [
    SumaryComponent
  ],
  providers: [
    PouchDBService,
    TicketService
  ],
  imports: [
    CommonModule,
    SumaryRoutingModule
  ]
})
export class SumaryModule { }
