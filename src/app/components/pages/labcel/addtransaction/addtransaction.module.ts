import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddtransactionRoutingModule } from './addtransaction-routing.module';
import { AddtransactionComponent } from './addtransaction.component';
import { ClockModule } from '@pages/home/clock/clock.module';
// import { BrowserModule } from '@angular/platform-browser';
import { NgxUpperCaseDirectiveModule } from 'ngx-upper-case-directive';

import { FormsModule, ReactiveFormsModule  } from "@angular/forms";

@NgModule({
  declarations: [
    AddtransactionComponent
  ],
  imports: [
    CommonModule,
    AddtransactionRoutingModule,
    ClockModule ,
    NgxUpperCaseDirectiveModule,
    // BrowserModule,
     FormsModule,
    ReactiveFormsModule
  ]
})
export class AddtransactionModule { }
