import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeSelectorComponent } from './home-selector.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HomeSelectorComponent
  ],
  imports: [
    CommonModule,
    RouterModule  
  ],
  exports: [HomeSelectorComponent],
})
export class HomeSelectorModule { }
