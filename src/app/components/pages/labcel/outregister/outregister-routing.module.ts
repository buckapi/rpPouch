import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutregisterComponent } from './outregister.component';

const routes: Routes = [{ path: '', component: OutregisterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutregisterRoutingModule { }
