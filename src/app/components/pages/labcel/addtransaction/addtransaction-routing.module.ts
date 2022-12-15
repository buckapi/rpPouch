import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddtransactionComponent } from './addtransaction.component';

const routes: Routes = [{ path: '', component: AddtransactionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddtransactionRoutingModule { }
