import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

@NgModule({
  declarations: [
 
    TransactionsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TransactionsRoutingModule,
    NgxDaterangepickerMd.forRoot({
      separator: ' - ',
      // locale:'es',
      
      applyLabel: 'Okay',
  })
  ]
})
export class TransactionsModule { }
