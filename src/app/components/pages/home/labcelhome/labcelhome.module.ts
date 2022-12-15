import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LabcelhomeRoutingModule } from './labcelhome-routing.module';
import { LabcelhomeComponent } from './labcelhome.component';
import {XsegundoService} from '@app/services/xsegundo.service';

import { ClockModule } from '@pages/home/clock/clock.module';
@NgModule({
  declarations: [
    LabcelhomeComponent
  ],
  imports: [
  FormsModule,  
    CommonModule,
    LabcelhomeRoutingModule,
    ClockModule
  ],
   providers: [XsegundoService],
    exports: [LabcelhomeComponent],
})
export class LabcelhomeModule { }
