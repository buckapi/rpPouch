import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './history.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ReversePipe } from '@pipes/reverse.pipe';

@NgModule({
  declarations: [
    ReversePipe,
    HistoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HistoryRoutingModule,
     NgxDaterangepickerMd.forRoot({
            separator: ' - ',
            // locale:'es',
            
            applyLabel: 'Okay',
        })
  ]
})
export class HistoryModule { }
