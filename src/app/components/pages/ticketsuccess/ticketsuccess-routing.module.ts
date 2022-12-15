import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsuccessComponent } from './ticketsuccess.component';

const routes: Routes = [{ path: '', component: TicketsuccessComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsuccessRoutingModule { }
