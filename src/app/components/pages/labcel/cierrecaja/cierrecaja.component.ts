import { Component, AfterViewInit } from '@angular/core';
import {BRANCHS} from '@app/services/branchs.service';
import {CARDS} from '@app/services/cards.service';
import dayjs, { Dayjs } from 'dayjs/esm';
import {Butler} from '@app/services/butler.service';
import { Apollo } from "apollo-angular";
import { DataService } from '@app/services/data.service'; 
import { DataApiService } from '@app/services/data-api.service';
@Component({
  selector: 'app-cierrecaja',
  templateUrl: './cierrecaja.component.html',
  styleUrls: ['./cierrecaja.component.css']
})
export class CierrecajaComponent implements AfterViewInit {
cierres$: any;
transactions$: any;
min=0;
size=0;
max=0;
show=false;
  constructor(
    private apollo: Apollo,
    public dataApi: DataService,
    public dataApiService: DataApiService,
    public _butler: Butler
  ) { }
    public loadFromRest(){
        this.transactions$=this.dataApiService.getTransationByBranch(this._butler.userActive.idBranch);
    }
    public setDay(from:any,to:any){
      this.show=true;
      this.min=from;
      this.max=to;
    }
    public checkSize(){
     this.cierres$=this.dataApiService
      .getCierresByBranch(this._butler.userActive.idBranch).subscribe((res:any) => {
     this.size=res.length;    
     console.log(JSON.stringify(res));
     });  
    }
    public loadCierres(){
     this.cierres$=this.dataApiService.getCierresByBranch(this._butler.userActive.idBranch);
    }
    ngAfterViewInit(): void {
      this.checkSize();
      this.loadFromRest();
      this.loadCierres();
  }
}
