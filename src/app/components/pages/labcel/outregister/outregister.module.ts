import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutregisterRoutingModule } from './outregister-routing.module';
import { OutregisterComponent } from './outregister.component';
import { NgxUpperCaseDirectiveModule } from 'ngx-upper-case-directive';

import { FormsModule, ReactiveFormsModule  } from "@angular/forms";
@NgModule({
  declarations: [
    OutregisterComponent
  ],
  imports: [
    CommonModule,
    OutregisterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
       NgxUpperCaseDirectiveModule,
  ]
})
export class OutregisterModule { }
