import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftSidebarComponent } from './left-sidebar.component';
import { RouterModule } from '@angular/router';
import { HomeSelectorModule } from '../home-selector/home-selector.module';

@NgModule({
  declarations: [
    LeftSidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HomeSelectorModule
  ],
  exports: [LeftSidebarComponent]
})
export class LeftSidebarModule { }
