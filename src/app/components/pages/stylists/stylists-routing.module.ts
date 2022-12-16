import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StylistsComponent } from './stylists.component';

const routes: Routes = [{ path: '', component: StylistsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StylistsRoutingModule { }
