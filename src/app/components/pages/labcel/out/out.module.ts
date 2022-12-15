import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OutRoutingModule } from './out-routing.module';
import { OutComponent } from './out.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

@NgModule({
  declarations: [
    OutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    OutRoutingModule,
    NgxDaterangepickerMd.forRoot({
            separator: ' - ',
            // locale:'es',
            
            applyLabel: 'Okay',
        })
  ]
})
export class OutModule { }
