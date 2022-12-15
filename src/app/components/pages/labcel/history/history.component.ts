import { Component, AfterViewInit } from '@angular/core';
import { BRANCHS } from '@app/services/branchs.service';
import { CARDS } from '@app/services/cards.service';
import dayjs, { Dayjs } from 'dayjs/esm';
import { Butler } from '@app/services/butler.service';
import { Apollo } from "apollo-angular";
import { DataService } from '@app/services/data.service'; 
import { DataApiService } from '@app/services/data-api.service'; 
import { ReversePipe } from '@pipes/reverse.pipe';

 export interface TimePeriod {
  [index: string]: Dayjs;
  startDate: Dayjs;
  endDate: Dayjs;
}
 export interface DateRanges {
  [index: string]: [Dayjs, Dayjs];
}
 export interface DateRange {
   label: string;
  dates: [Dayjs, Dayjs];
}
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements AfterViewInit {
  transactions$: any;
  transactionsAux$: any;
  transactionSelected:any={};
  filtering=false;
  filter="";
  public branchs:any=[];
  public cards:any=[];
  selected: TimePeriod;
  alwaysShowCalendars: boolean;
  showRangeLabelOnInput: boolean;
  keepCalendarOpeningWithRange: boolean;
  maxDate: dayjs.Dayjs;
  minDate: dayjs.Dayjs;  
  invalidDates: dayjs.Dayjs[] = [];
  tooltips = [
    { date: dayjs(), text: 'Today is just unselectable' },
    { date: dayjs().add(2, 'days'), text: 'Yeeeees!!!' }
  ];
  inlineDateTime: TimePeriod;
  ranges: DateRanges = {
    ['Hoy']: [dayjs(), dayjs()],
    ['Ayer']: [dayjs().subtract(1, 'days'), dayjs().subtract(1, 'days')],
    ['Últimos 7 Días']: [dayjs().subtract(6, 'days'), dayjs()],
    ['Últimos 30 Días']: [dayjs().subtract(29, 'days'), dayjs()],
    ['Este mes']: [dayjs().startOf('month'), dayjs().endOf('month')],
    ['último mes']: [dayjs().subtract(1, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')],
    ['últimos 3 meses']: [dayjs().subtract(3, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')]
  };

  constructor(
   private apollo: Apollo,
    public dataApi: DataService,
    public dataApiService: DataApiService,
    public _butler: Butler
    ) { 
    this.maxDate = dayjs().add(2, 'weeks');
    this.minDate = dayjs().subtract(3, 'days');
    this.alwaysShowCalendars = true;
    this.keepCalendarOpeningWithRange = true;
    this.showRangeLabelOnInput = true;
    this.selected = {
      startDate: dayjs().subtract(1, 'days').set('hours', 0).set('minutes', 0),
      endDate: dayjs().subtract(1, 'days').set('hours', 23).set('minutes', 59)
    };
    this.branchs=BRANCHS;
    this.cards=CARDS
  }

  porFecha = (i: number) => this.transactions$[this.transactions$.length - 1 - i];
  public view(transaction:any){
    this.transactionSelected=transaction;
  }
  isInvalidDate = (m: dayjs.Dayjs): boolean => {
    return this.invalidDates.some((d) => d.isSame(m, 'day'));
  };

  isTooltipDate = (m: Dayjs): string | boolean | null => {
    const tooltip = this.tooltips.find((tt) => tt.date.isSame(m, 'day'));
    if (tooltip) {
      return tooltip.text;
    } else {
      return false;
    }
  };
  public getBranchTransactions(){
    //console.log(JSON.stringify(this.transactions$));
  } 
  public setFilter(idbranch:any){
    this.filter=idbranch;
    this.filtering=true;
  }
  public ordering(){
    this.transactionsAux$=[];
    let size=this.transactions$.length;
    //this.transactions$=null;    
    for (let i=size;i=0;i--){
              this.transactionsAux$.push(this.transactions$[i]);
    }
    this.transactions$=[];
    for (let i=0;i<0;i++){
      this.transactions$.push(this.transactionsAux$[i]);
    }
  }
  fechaCreacion = (i: number) => this.transactions$[this.transactions$.length - 1 - i];

  rangeClicked(range: DateRange): void {
    // eslint-disable-next-line no-console
    console.log('[rangeClicked] range is : ', range);
  }

  datesUpdated(range: TimePeriod): void {
    // eslint-disable-next-line no-console
    console.log('[datesUpdated] range is : ', range);
  }

  chosenDateTime(e: TimePeriod): void {
    this.inlineDateTime = e;
  }

  public loadFromRestIndividual(){
      this.transactions$=this.dataApiService.getTransationByBranch(this._butler.userActive.idBranch);
  }
  public loadFromRestUniversal(){
  //    this.transactions$=this.dataApiService.getAllTransactions().subscribe((res:any) => {
  //        this.ordering();   
  //        console.log(JSON.stringify(this.transactions$));
  //      });  
  this.transactions$=this.dataApiService.getAllTransactions();
  }
  public reload(){
    console.log("pedido de ejeucion");
    this.transactions$=null;
    this.dataApi.getTransactionsByBranch(0,0,this._butler.userActive.idBranch);
  }
  ngAfterViewInit(): void {
    if(this._butler.admin){
      this.loadFromRestUniversal();
    }else{
      this.loadFromRestIndividual();   
    }
  }

}
