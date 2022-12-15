import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutComponent } from './out.component';

const routes: Routes = [{ path: '', component: OutComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutRoutingModule { }
