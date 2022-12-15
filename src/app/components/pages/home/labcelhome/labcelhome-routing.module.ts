import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabcelhomeComponent } from './labcelhome.component';

const routes: Routes = [{ path: '', component: LabcelhomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabcelhomeRoutingModule { }
