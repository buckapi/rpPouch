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

export interface itemForm {
  servicio: string;
  tipo: string;
  imei: string;
  tag: string;
  folio: string;
  monto: number;
  referencia: string;
  tecnico: string;
  concepto: string;
}
@Component({
  selector: 'app-addtransaction',
  templateUrl: './addtransaction.component.html',
  styleUrls: ['./addtransaction.component.css']
})
export class AddtransactionComponent implements AfterViewInit {

   form: FormGroup = new FormGroup({
    tag: new FormControl(''),
    imei: new FormControl(''),
    folio: new FormControl(''),
    monto: new FormControl(''),
  });
   payjoy: FormGroup = new FormGroup({
    referencia: new FormControl(''),
    imeiPayjoy: new FormControl(''),
    folioPayjoy: new FormControl(''),
    montoPayjoy: new FormControl(''),
  });
   acce: FormGroup = new FormGroup({ 
    concepto: new FormControl(''),
    folioAcce: new FormControl(''),
    montoAcce: new FormControl(''),
  });
  //  tarjeta: FormGroup = new FormGroup({ 
  //   folioTarjeta: new FormControl('')
  // });
  submitted = false;
  submittedPayjoy = false;
  submittedAcce = false;
  submittedTarjeta = false;
  public technicals:any=[];
  public options:any=[];
  public ticket:any={};
  public newSerial:any={};
  public branch:any={};
  public item :any={
  // servicio:"",
  // tipo:"",
  // imei:"",
  // tag:"",
  // folio:"",
  // monto:0,
  // referencia:"",
  // tecnico:"",
  // concepto:"",
}; 
nticket=0;
currentSerial=0;
  ticketSize=0;
  cobro=0;
  folioTarjeta=0;
  cambio=0;
  total=0;
  option=0;
  optionSelectedText="";
  mensaje="Ticket de venta creado!";
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
    ) {
  this.technicals=TECHNICALS
     }
public setOption(option:any){
  this.option=option;
  if(option==1){this.optionSelectedText="PAYJOY ✔";this.optionSelected=true;this.item.servicio='PAYJOY';}
  if(option==2){this.optionSelectedText="FOXPAY ✔";this.optionSelected=true;this.item.servicio="FOXPAY";}
  if(option==3){this.optionSelectedText="CC FACIL ✔";this.optionSelected=true;this.item.servicio="CC FACIL";}
  if(option==4){this.optionSelectedText="ACCESORIOS ✔";this.optionSelected=true;this.item.servicio="ACCESORIOS";}
  if(option==5){this.optionSelectedText="REPARACION ✔";this.optionSelected=true;this.item.servicio="REPARACION";}
  
}

public setTechnical(technical:any){
  this.technical=technical;
  for (let i =0;i<this.technicals.length;i++){
 if(technical==i+1){this.technicalSelectedText= this.technicals[i].name+" ✔";this.technicalSelected=true;this.item.tecnico=this.technicals[i].name;}

  }
 
}
public setType(type:any){
  this.type=type;
 if(type==1){this.typeSelectedText="Enganche ✔";this.typeSelected=true;this.item.tipo="Enganche";}
  if(type==2){this.typeSelectedText="Parcialidad ✔";this.typeSelected=true;this.item.tipo="Parcialidad";}

 
}
public setRepair(repair:any){
  this.repair=repair;
 if(repair==1){this.repairSelectedText="Hardware ✔";this.repairSelected=true;this.item.tipo="Hardware";}
  if(repair==2){this.repairSelectedText="Software ✔";this.repairSelected=true;this.item.tipo="Software";}

 
}
public setMethod(method:any){
  this.method=method;
 if(method==1){this.methodSelectedText="Efectivo ✔";this.methodSelected=true;this.item.tipo="Efectivo";}
  if(method==2){this.methodSelectedText="Transferencia ✔";this.methodSelected=true;this.item.tipo="Transferencia";}
  if(method==3){this.methodSelectedText="Tarjeta ✔";this.methodSelected=true;this.item.tipo="Tarjeta";}

 
}
 get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  get g(): { [key: string]: AbstractControl } {
    return this.payjoy.controls;
  }
  get h(): { [key: string]: AbstractControl } {
    return this.acce.controls;
  }
    onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    this.item.imei=this.form.value.imei;
    this.item.tag=this.form.value.tag;
    this.item.folio=this.form.value.folio;
    this.item.monto=this.form.value.monto;
    // console.log(JSON.stringify(this.item));
    this.addItem();
    ;
  }
onSubmit2(): void {
    this.submittedPayjoy = true;

    if (this.payjoy.invalid) {
      return;
    }
    this.item.imei=this.payjoy.value.imeiPayjoy;
    this.item.referencia=this.payjoy.value.referencia;
    this.item.folio=this.payjoy.value.folioPayjoy;
    this.item.monto=this.payjoy.value.montoPayjoy;
    this.addItem();
    // console.log(JSON.stringify(this.payjoy.value, null, 2));
  }
onSubmit3(): void {
    this.submittedAcce = true;

    if (this.acce.invalid) {
      return;
    }
    this.item.concepto=this.acce.value.concepto;
    this.item.folio=this.acce.value.folioAcce;
    this.item.monto=this.acce.value.montoAcce;
    // console.log(JSON.stringify(this.item));
    this.addItem();
    // console.log(JSON.stringify(this.payjoy.value, null, 2));
  }
public sendTicket(){
  this.ticket.items=this._butler.ticket;
  this.ticket.idApp=this._butler.userActive.idApp;
  this.ticket.idBranch=this._butler.userActive.idBranch;
  this.ticket.idCard=this._butler.userActive.idCard;
  this.ticket.email=this._butler.userActive.email;
  this.ticket.name=this._butler.userActive.name;
  this.ticket.folioTarjeta=this.folioTarjeta;
  this.ticket.serialT=this.currentSerial;
   this.toastSvc.success(this.mensaje, 'Ticket guardado');
   if (this.folioTarjeta==0){this.ticket.folioTarjeta=null;}
   if(this.methodSelectedText=='Efectivo ✔'){
    this.ticket.method="Efectivo";
    this.ticket.cobro=this.cobro;
    this.ticket.cambio=this.cobro-this.total;
  }
   if(this.methodSelectedText=='Transferencia ✔'){this.ticket.method="Transferencia";}
   if(this.methodSelectedText=='Tarjeta ✔'){this.ticket.method="Tarjeta";}
   this.ticket.total=this.total;
   this.ticket.amount=this.total;
   this.ticket.status="completed";
   // this.ticket.type="completed";
   this.ticket.transactionType="ingress";
   this.ticket.description="Ticket de venta";
   this.ticket.ref=this.nticket;
   // this.dataApiService.saveTicket(this.ticket).subscribe( tix => this.router.navigate(['/home']));
   this.dataApiService.saveTicket(this.ticket)
   .subscribe((res:any) => {
     this._butler.ticket=[];
       this.ticket=null;
       this.setSerialT();
       this.router.navigate(['/labceltransactions']);
     });  
    // console.log(JSON.stringify(this.ticket));
     console.log(JSON.stringify(this.options));
}
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
  public setSerialT(){
    this._butler.bramch.serialT=this.currentSerial;
    console.log("new: "+this.newSerial.serialT);
    this.dataApiService.setSerialT(this._butler.bramch,this._butler.userActive.bramch).subscribe();
  }
public aleatorio(a:any,b:any) {
    return Math.round(Math.random()*(b-a)+parseInt(a));
  }
public resetRepair(){
  this.repair=0;
 this.repairSelected=false;
}
public resetOption(){
 this.option=0;
 this.optionSelected=false;
}
public resetType(){
 this.type=0;
 this.typeSelected=false;
}
public resetMethod(){
 this.method=0;
 this.methodSelected=false;
 this.cobro=0;
 this.folioTarjeta=0;
}
public setEqual(){
  this.cobro=this.total;
}
public resetTechnical(){
  this.technical=0;
 this.technicalSelected=false;
}
public addItem(){
  for(let i=1;i<6;i++){
    if(i+1==this.option){
      this.options[i]=true;
    }else{
      // this.options[i]=false;

    }
  }
  this.total=this.total+this.item.monto;
  this._butler.ticket.push(this.item);
  this.ticketSize=this.ticketSize+1;
  this.item={};
  this.show=false;
  this.resetAll();
}
public showRutine(){
  this.show=true;
}
public noShow(){
  this.show=false;
  this.resetAll();
}
public resetAll(){
   this.resetRepair();
  this.resetTechnical();
  this.resetType();
  this.resetOption();
}

public unoC(){
    this.form = this.formBuilder.group(
      {
        
        tag: ['', Validators.required],
        imei: ['', Validators.required],
        folio: ['', Validators.required],
        monto: [0, Validators.required]
        
       

        // fullname: ['', Validators.required],
        // username: [
        //   '',
        //   [
        //     Validators.required,
        //     Validators.minLength(6),
        //     Validators.maxLength(20)
        //   ]
        // ],
        // email: ['', [Validators.required, Validators.email]],
        // password: [
        //   '',
        //   [
        //     Validators.required,
        //     Validators.minLength(6),
        //     Validators.maxLength(40)
        //   ]
        // ],
        // confirmPassword: ['', Validators.required],
        // acceptTerms: [false, Validators.requiredTrue]
      }
      // ,
      // {
      //   validators: [Validation.match('password', 'confirmPassword')]
      // }
    );
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

     for(let i=0;i<5;i++){
      this.options.push(false);  
  }
this.options=[];
this.nticket=this.aleatorio(10000,99999);
  this.unoC();
    this.payjoy = this.formBuilder.group(
      {
        referencia: ['', Validators.required],
        imeiPayjoy: ['', Validators.required],
        folioPayjoy: ['', Validators.required],
        montoPayjoy: [0, Validators.required]
      }
  
    );
    this.acce = this.formBuilder.group(
      {
        concepto: ['', Validators.required],
        folioAcce: ['', Validators.required],
        montoAcce: [0, Validators.required]
      }
  
    );
  
  }

}
