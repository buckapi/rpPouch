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
import gql from "graphql-tag";
import {TECHNICALS} from '@app/services/technicals.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-outregister',
  templateUrl: './outregister.component.html',
  styleUrls: ['./outregister.component.css']
})
export class OutregisterComponent implements AfterViewInit {
 salidaForm: FormGroup = new FormGroup({ 
    concepto: new FormControl(''),
    montoAcce: new FormControl(''),
  
  });
  submitted = false;
  submittedPayjoy = false;
  submittedAcce = false;
  submittedTarjeta = false;
  public technicals:any=[];
  public options:any=[];
  public salida:any={};
  public item :any={
}; 

  public newSerial:any={};
  showB=false;   
  mensaje="Salida registrada!";
  category="Seleccione una!";
  currentSerial=0;

  nticket=0;
  
  ticketSize=0;
  cobro=0;
  folioTarjeta=0;
  cambio=0;
  total=0;
  option=0;
  optionSelectedText="";
  optionSelected=false;   
  methodSelectedText="";
  methodSelected=false;   
  show=true;   
  repair=0;
  method=0;
  repairSelectedText="";
  repairSelected=false;  
  technical=0;
  technicalSelectedText="";
  technicalSelected=false;
  type=0;
  typeSelectedText="";
  typeSelected=false;

  constructor(
    private bikersService:BikersService,
    public script:ScriptService,
    private mapService:MapService,
    public router:Router,
    private apollo: Apollo,
    public dataApi: DataService,
    public dataApiService: DataApiService,
    public _butler: Butler,
    private formBuilder: FormBuilder,
    private readonly toastSvc: ToastrService
    ) { }
  get h(): { [key: string]: AbstractControl } {
    return this.salidaForm.controls;
  }
    public sendTicket(){
     this.submittedAcce = true;
      if (this.salidaForm.invalid) {
      return;
    }
  this.salida.idApp=this._butler.userActive.idApp;
  this.salida.idBranch=this._butler.userActive.idBranch;
  this.salida.idCard=this._butler.userActive.idCard;
  this.salida.email=this._butler.userActive.email;
  this.salida.name=this._butler.userActive.name;
  this.salida.method="Efectivo";
  this.salida.folioTarjeta=null;
  this.salida.items=[];
  
  this.salida.serialT=this.currentSerial;
  this.salida.amount=this.salidaForm.value.montoAcce;
  this.salida.description=(this._butler.userActive.categories[this.category])+" ("+this.salidaForm.value.concepto+") ";
  this.toastSvc.success(this.mensaje, 'Salida registrada');
  this.salida.status="completed";
  this.salida.transactionType="egress";
  // this.salida.categoria=this.salidaForm.value.categoria;
  this.salida.ref=this.nticket;
  this.dataApiService.saveTicket(this.salida)
   .subscribe((res:any) => {
    this.setSerialT();
       this.router.navigate(['/labcelout']);

     });  
     console.log(JSON.stringify(this.options));
}
public aleatorio(a:any,b:any) {
    return Math.round(Math.random()*(b-a)+parseInt(a));
  }
public setSerialT(){
    this._butler.bramch.serialT=this.currentSerial;
    console.log("new: "+this.newSerial.serialT);
    this.dataApiService.setSerialT(this._butler.bramch,this._butler.userActive.bramch).subscribe();
  }
public  setOption(){
    this.salida.categoria=this._butler.userActive.categories[this.category];
    this.showB=true;
    console.log("Category selected "+this._butler.userActive.categories[this.category]);
  }

  ngAfterViewInit(): void {
         this.dataApiService.getSerialT(this._butler.userActive.bramch)
        .subscribe((res:any) => {
        this._butler.serialT=res.serialT;
        this.currentSerial=res.serialT+1;
        this._butler.bramch=res;
        this.newSerial.serialT=this.currentSerial;
        console.log("serial: "+this._butler.serialT);
        
      });
    this.nticket=this.aleatorio(10000,99999);
    this.salidaForm = this.formBuilder.group(
      {
        concepto: ['', Validators.required],
        montoAcce: [0, Validators.required]
      }
  
    );
  }

}
