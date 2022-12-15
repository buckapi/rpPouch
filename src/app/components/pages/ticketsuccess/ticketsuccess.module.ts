import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsuccessRoutingModule } from './ticketsuccess-routing.module';
import { TicketsuccessComponent } from './ticketsuccess.component';
import {NgxPrintModule} from 'ngx-print';


@NgModule({
  declarations: [
    TicketsuccessComponent
  ],
  imports: [

  NgxPrintModule,
    CommonModule,
    TicketsuccessRoutingModule
  ]
})
export class TicketsuccessModule { }
