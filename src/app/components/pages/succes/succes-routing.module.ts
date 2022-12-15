import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuccesComponent } from './succes.component';

const routes: Routes = [{ path: '', component: SuccesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuccesRoutingModule { }
