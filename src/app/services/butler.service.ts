import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Butler {
    car:any[]=[];
    branchs:any[]=[];
    ticket:any={
        npedido:''
    };
    currency:number=1;
    init:number=1;
    end:number=12;
    numProd:number=0;
    subTotalGral:number=0;
    cardsSize:number=0;
    results:number=0;
    preview:any={};
    bramch:any={};
    specialtyToDelete:any={};
    serviceToAdd:any={};
    serviceToDelete:any={};
    stylistToDelete:any={};
    deal:any={};
    userActive:any={};
    totalProducts:number=0;
    especialidadesSize:number=0;
    especialistasSize:number=0;
    imagePreviewProduct:string="";
    stylistName:string="";
    subTotal:number=0;
    review:boolean=false;
    vector:any={};       
    string:string=""; 
    distance:string="";
    modalOption:number=0;
    deviceType:string="";
    distance2:number=0;
    duration:number=0;
    biker:boolean=false;
    medio:boolean=false;
    list:boolean=false;
    grid:boolean=false;
    hidden:boolean=false;
    details:boolean=false;
    editing:boolean=false;
    profile:boolean=true;
    isLogged:boolean=false;
    bikerStatus:boolean=false;
    skip:number=0;
    limit:number=12;
    type:string="Passenger"; 
    placeholder:string="a donde deseas ir?"; 
	  any:any[]=[]; 
    number:number=0;
    rides:boolean=false;
    admin:boolean=false;
    name:string=""; 
    idResult:string=""; 
    idApp:string=""; 
    userd:string=""; 
    role:string=""; 
    idBuckapicard:string=""; 
    idCard:string=""; 
    idBranch:string=""; 
    branch:string=""; 
    userId:string=""; 
    userType:string=""; 
    email:string=""; 
    cards:any[]=[]; 

    serialT:number=0;
   file:any[]=[];
      images:any[]=[];
    constructor() { }
}