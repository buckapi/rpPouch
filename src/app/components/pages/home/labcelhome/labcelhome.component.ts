import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ScriptService } from '@app/services/script.service';
import { ScriptStore } from '@app/services/script.store';
import { SwiperOptions } from 'swiper';
import {Butler} from '@app/services/butler.service';
import { BikersService } from '@app/services/';
import {Map, Popup,Marker} from 'mapbox-gl';
import { MapService } from '@app/services/map.service';
import { Feature } from '@app/interfaces/places';
import { BuckapicardInterface } from '@app/interfaces/buckapicard';
import { Apollo } from "apollo-angular";
import { DataService } from '@app/services/data.service'; 
import { DataApiService } from '@app/services/data-api.service'; 
import {BRANCHS} from '@app/services/branchs.service';
import {CARDS} from '@app/services/cards.service';

@Component({
  selector: 'app-labcelhome',
  templateUrl: './labcelhome.component.html',
  styleUrls: ['./labcelhome.component.css']
})
export class LabcelhomeComponent implements AfterViewInit {
  
   public  banchss:any=["br000003","br000002","-","br000001"];
    transactions$: any;
    allTransactions: any;
  public  totales:any=[0,0,0,0];
  public  egresos:any=[0,0,0,0];
  public  ingresos:any=[0,0,0,0];
  public branchs:any=[];
  public cards:any=[];
  public totalCalculado=0;
  public ingresosCalculado=0;
  public egresosCalculado=0;
  public size=0;
  constructor(
 private bikersService:BikersService,
    public script:ScriptService,
    private mapService:MapService,
    public router:Router,
    private apollo: Apollo,
    public dataApi: DataService,
    public dataApiService: DataApiService,
    public _butler: Butler
    ) { 
  this.branchs=BRANCHS;
  this.cards=CARDS
  }
public totalIndividual(idBranch:any){
  console.log("llamado");
  this.totalCalculado=0;
  let pidBranch=idBranch;
  if(this.transactions$!==undefined){
    // let size = this.transactions$.length;
    for (let i =0;i<this.size;i++){
      if(this.transactions$[i].idBranch == pidBranch ){         
        this.totalCalculado=this.totalCalculado+this.transactions$[i].amount;
      }
    }
  }
}
public calculoTotales(){
  // console.log("entrando");
  for (let i =0;i<4;i++){
      this.totalCalculado=0;
    for (let j =0;j<this.size;j++){
      if(this.transactions$[j].idBranch == this.banchss[i] ){         
        this.totales[i]==this.totalCalculado+this.transactions$[j].amount;
      }
    }
    // this.totalIndividual(this.banchss[i]);
    // this.totales[i]=this.totalCalculado;
  }
      console.log(JSON.stringify(this.totales));
}

 public loadFromRestIndividual(){
      this.transactions$=this.dataApiService.getTransationByBranch(this._butler.userActive.idBranch);
  }
  public loadFromRestUniversal(){
      this.transactions$=this.dataApiService.getAllTransactions();
  }
  public loadFromGQL(){
    this.dataApi.getTransactionsByBranch(0,0,this._butler.userActive.idBranch);
    this.transactions$=this.dataApi.transactions$;  
  }
  public checkSize(){
    this.dataApiService.getAllTransactions()
     .subscribe((res:any) => {
       let size=res.length;  
       console.log("size: "+size);
       this.totales=[];
       this.egresos=[];
       this.ingresos=[];
      for (let i =0;i<4;i++){
          for (let j =0;j<size;j++){
            if(res[j].idBranch!=='undefined' &&  res[j].idBranch==this.banchss[i] ){         
              if (res[j].transactionType==="ingress"){
                this.ingresosCalculado=this.ingresosCalculado+res[j].amount;
                console.log("uno");
              }else{
                this.egresosCalculado=this.egresosCalculado+res[j].amount;
              }
              this.totalCalculado=this.totalCalculado+res[j].amount;
            }
          }
              this.totales.push(this.totalCalculado);
              this.egresos.push(this.egresosCalculado);
              this.ingresos.push(this.ingresosCalculado);

              this.totalCalculado=0;
              this.ingresosCalculado=0;
              this.egresosCalculado=0;
        // this.totalIndividual(this.banchss[i]);
        // this.totales[i]=this.totalCalculado;
      }
      console.log(JSON.stringify(this.totales));
       // this.calculoTotales();
       // this.calculoTotales();
       // console.log(JSON.stringify(this.allTransactions));
       });  
    }
  ngAfterViewInit(): void {
      // this.loadFromRestUniversal()
      if(!this._butler.isLogged){    
        this.router.navigate(['/login'])
      }
      if (this._butler.admin){
        this.loadFromRestUniversal();
      this.checkSize();
      }else{
        this.loadFromRestIndividual();
      }
  }

}
