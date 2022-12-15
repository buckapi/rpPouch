import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RastreaComponent } from './rastrea.component';

const routes: Routes = [{ path: '', component: RastreaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RastreaRoutingModule { }
