import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SumaryComponent } from './sumary.component';

const routes: Routes = [{ path: '', component: SumaryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SumaryRoutingModule { }
