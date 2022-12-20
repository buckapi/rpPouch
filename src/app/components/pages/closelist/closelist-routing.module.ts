import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CloselistComponent } from './closelist.component';

const routes: Routes = [{ path: '', component: CloselistComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CloselistRoutingModule { }
