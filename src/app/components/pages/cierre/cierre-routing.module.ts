import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CierreComponent } from './cierre.component';

const routes: Routes = [{ path: '', component: CierreComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CierreRoutingModule { }
