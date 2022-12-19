import { Component, EventEmitter,AfterViewInit,  Output, ViewChild ,ElementRef} from '@angular/core'
import { DemoFilePickerAdapter } from  './file-picker.adapter';
import { FilePickerComponent, FilePreviewModel } from 'ngx-awesome-uploader';
import { isError } from "util";
import { Observable, of } from 'rxjs';
import { UploaderCaptions } from 'ngx-awesome-uploader';
import { HttpClient } from  '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ValidationError } from 'ngx-awesome-uploader';
import { delay, map } from 'rxjs/operators';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BikersService } from './services';
import { Butler } from './services/butler.service';
import { Router } from '@angular/router';
import { ScriptService } from '@app/services/script.service';
import { ScriptStore } from '@app/services/script.store';
import { SwiperOptions } from 'swiper';
import { DeviceDetectorService } from 'ngx-device-detector'
import { DataService } from '@app/services/data.service'; 
import { DataApiService } from '@app/services/data-api.service'; 
import * as $ from 'jquery';
import { ChangeDetectorRef } from '@angular/core';
import { StylistService } from "@services/stylist.service";
import { TicketService } from "@services/ticket.service";
import { ServiceService } from "@services/service.service";
import { SpecialtyService } from "@services/specialty.service";
//import { FriendService } from "@services/friend.service";
import { PouchDBService } from "@services/pouchdb.service";
import { ISpecialty } from "@app/services/specialty.service";
import { ITicket } from "@app/services/ticket.service";
import { IStylist } from "@app/services/stylist.service";
import { IService } from "@app/services/service.service";
interface IAddForm {
  name: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  public addForm: IAddForm;
  public stylists: IStylist[];
  public services: IService[];
  public specialtys: ISpecialty[];
  public tickets: ITicket[];

  public user: any;
  private stylistService: StylistService;
  private serviceService: ServiceService;
  private specialtyService: SpecialtyService;
  private ticketService: TicketService;

  private pouchdbService: PouchDBService;
  pouchdb: any;
  ticket:any={
    npedido:''
  }
  methods:any=[
    {name:"Efectivo"},
    {name:"Tarjeta"},
    {name:"Transferencia"}
  ];
  deviceInfo:any=null
  branchsSelected:any=false;
  @ViewChild('uploader', { static: true }) uploader: FilePickerComponent;
  branchs$:any;
    members$: any;
    cards$: any;
  public adapter = new DemoFilePickerAdapter(this.http,this._butler);
  public myFiles: FilePreviewModel[] = [];
  public product:any={};
  public images:any=
 [
      'assets/assetsryal/work.png'
    ]
    public options:any=[];
    public ticketServices:any=[];
    public specialtyToDelete :any={};
    public order :any={
      ticketServices:[],
      total:0,
      npedido:0,
      method:"",
      stylist:"",
      status:"",
      statusClose:"",
      customer:""
    };
    public stylistToDelete :any={};
    public serviceToDelete :any={};
    public itemSpecialty :any={};
    public itemStylisty :any={};
    public itemService :any={};
    public card :any={};
    public cardsSelected :any=false;
    submittedStylist = false;
    onAdd = false;
    adding = true;
    sendStylistFlag = false;
    empty = true;
    sendTicketFlag = false;
    addTicketFlag = false;
    submittedSpecialty = false;
    submittedService = false;
    submittedAddService = false;    
    submittedPaymment = false;
    showB=false;  
    methodSelected=false;  
    category="Seleccione una!";
    methodSelectedField="";
    branchSelected="";
    mensaje="Salida registrada!";
    customer="";
    randomSerial=0;
    ticketListSize=0;
    pay=0;
    ammount=0;
    total=0;
    step=1;



    public    setPriceS(){
      // this.methodSelected=true;
      this.ammount=this._butler.serviceToAdd.basePrice;
      // this.step=step;
    }
    public    setMethod(index:any){
      this.methodSelected=true;
      this.methodSelectedField=this.methods[index].name;
      // this.step=step;
    }
    public    back(step:any){
      this.step=step;
  
    }
     public aleatorio(a:any,b:any) {
    return Math.round(Math.random()*(b-a)+parseInt(a));
  }
    public    next(step:any){
      if(step==3){
       this.order.total=this.total;
       this.order.method=this.methodSelectedField;
       this.order.customer=this.customer;
       this.order.stylist=this._butler.stylistName;
       this.order.npedido=this.aleatorio(10000,99999);
       this.order.status="activated";
       this.order.statusClose="pending";
       this.order.cobro=this.pay;
       this.order.cambio=this.pay-this.total;
       this.order.ticketServices=this.ticketServices;
       this._butler.ticket=this.order;
       this.order.createdAt =new Date();
       this.ticketService
          .addTicket( this.order )
          .then(
            ( id: string ) : void => {
              console.log( "New order added:", id );
              this.loadTickets();
              this.toastSvc.success("Ticket procesado con exito!" );
              this.step=1;
              this.ticketServices=[];
              this.ammount=0;
              this.total=0;
              this.pay=0;
              this.customer="-";
              this.methodSelected=false;
              this.onAdd=false;
              this.empty=true;
              this.router.navigate(['/ticketsuccess']);
            },
            ( error: Error ) : void => {
              console.log( "Error:", error );
            }
          ); 
      }
      this.step=step;
    }
    get f(): { [key: string]: AbstractControl } {
      return this.specialty.controls;
    }
    get g(): { [key: string]: AbstractControl } {
      return this.stylist.controls;
    }
    get h(): { [key: string]: AbstractControl } {
      return this.service.controls;
    }
    get z(): { [key: string]: AbstractControl } {
      return this.addServiceForm.controls;
    }
    get r(): { [key: string]: AbstractControl } {
      return this.addServiceForm.controls;
    }
     paymmentForm: FormGroup = new FormGroup({
      // pay: new FormControl('')
    });
     addServiceForm: FormGroup = new FormGroup({
      // ammount: new FormControl('')
    });
     specialty: FormGroup = new FormGroup({
      name: new FormControl('')
    });
     stylist: FormGroup = new FormGroup({
      name: new FormControl('')
    });
     service: FormGroup = new FormGroup({
      name: new FormControl(''),
      basePrice: new FormControl('')
    });


  new: FormGroup = new FormGroup({ 
  description: new FormControl(''),
  name: new FormControl(''),
  price: new FormControl(''),
  });

  i=1;
  two=false;
  one=true;
  three=false;
  public captions: UploaderCaptions = {
    dropzone: {    
      title: 'Foto del estilista',
      or: '',
      browse: 'Cargar',
    },
    cropper: {
      crop: 'Cortar',
      cancel: 'Cancelar',
    },
    previewCard: {
      remove: 'Remover',
      uploadError: 'Error en la carga',
    },
  };
    public isError = false;
    public cropperOptions = {
    minContainerWidth: '300',
    minContainerHeight: '300',
  };
@ViewChild('modal1')  modal1: ElementRef ;
  config: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30
  };


 


  title = 'ryalpos';
  element:any;
  public quantity : number=1; 
  public sent : boolean=false; 
  public subTotalGral : number=0; 
  public preview :any={
  quantity:1,
  image:"",
  subTotal:0,
  product:"",

}; public tixToAdd :any={
  quantity:1,
  image:"",
  subTotal:0,
  product:"",

}; 
  constructor(
    private cdRef:ChangeDetectorRef,
    private  http: HttpClient,
    private formBuilder: FormBuilder,
    private readonly toastSvc: ToastrService,
    public script:ScriptService,
    public dataApi: DataService,
    public dataApiService: DataApiService,
    public bikersScript:BikersService,
    public _butler:Butler,
    public router:Router,
    private elementRef: ElementRef,
    private deviceService: DeviceDetectorService,
       stylistService: StylistService,
       specialtyService: SpecialtyService,
       serviceService: ServiceService,
       ticketService: TicketService,
      pouchdbService: PouchDBService
  ){
     this.stylistService = stylistService;
     this.serviceService = serviceService;
     this.specialtyService = specialtyService;
     this.ticketService = ticketService;

      
      this.stylists = [];
      this.services = [];
      this.specialtys = [];
      this.tickets = [];
  
      this.pouchdbService = pouchdbService;
      


      this.addForm = {
        name: ""
      };
      


      this.user = null;
    document.getElementById('modal1');
     this.script.load(     
      )
      .then(data => {
      })
      .catch(error => console.log(error));
  }
  public login( userIdentifier: string ) : void {
  this.pouchdbService.configureForUser( userIdentifier );
  this.user = userIdentifier;
  this.loadStylists();

}
  public goAdding(){
    this.adding=true;
  }
  public delete(service:any){
  }
  private loadStylists() : void {
     
  this.stylistService
    .getStylists()
    .then(
      ( stylists: IStylist[] ) : void => {
        this._butler.stylists= this.stylistService.sortStylistsCollection( stylists );
      
      },
      ( error: Error ) : void => {
        console.log( "Error", error );
      }
    )
  ;
}  
private loadServices() : void {
  this.serviceService
    .getServices()
    .then(
      ( services: IService[] ) : void => {
        this.services = this.serviceService.sortServicesCollection( services );
        this._butler.services=this.services;
      },
      ( error: Error ) : void => {
        console.log( "Error", error );
      }
    )
  ;
}
private loadSpecialtys() : void {
  this.specialtyService
    .getSpecialtys()
    .then(
      ( specialtys: ISpecialty[] ) : void => {
        this.specialtys = this.specialtyService.sortSpecialtysCollection( specialtys );
        this._butler.specialtys=this.specialtys;
      },
      ( error: Error ) : void => {
        console.log( "Error", error );
      }
    )
  ;
}
private loadTickets() : void {
  this.ticketService
    .getTickets()
    .then(
      ( tickets: ITicket[] ) : void => {
        this.tickets = this.ticketService.sortTicketsCollection( tickets );
        this._butler.tickets=this.tickets;
      },
      ( error: Error ) : void => {
        console.log( "Error", error );
      }
    )
  ;
}

  public setBranch(name:any){
    console.log('dato: '+name);
    this.itemStylisty.category=name;
    this.branchsSelected=true;
    this.sendStylistFlag=true;
    this.branchSelected=name;
  }
  public openModal(i:any){
    this._butler.modalOption=i;
    this.ticket=this._butler.ticket;
  }
    onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }
  public minus(){
    if (this.quantity>1){
      this.quantity=this.quantity-1;
    }
  }
  public plus(){
    this.quantity=this.quantity+1;
  }

  public sendService(){
    this.submittedService=true;
    if(this.service.invalid){
      return
    }
    this.itemService=this.service.value;name;
    this.itemService.status="active";
    // this.dataApiService.saveService(this.itemService)
    // .subscribe((res:any) => {
    // this.toastSvc.success("servicio agregado con exito!" );
    // this.router.navigate(['/sumary']);
    // });    
    this.serviceService
      .addService( this.itemService )
      .then(
        ( id: string ) : void => {
          console.log( "New service added:", id );
          this.loadServices();
    //        this._butler.services=this.services;
         // this.addForm.name = "";

         this.toastSvc.success("Servicio agregado con exito!" );
        // this.router.navigate(['/sumary']);
        },
        ( error: Error ) : void => {
          console.log( "Error:", error );
        }
      )
    ;  
  }

  public deleteSpecialty(){
    this.specialtyToDelete=this._butler.specialtyToDelete;;
    this.specialtyToDelete.status="deleted";
    this.toastSvc.info("Especialidad borrada con exito!" );
    this.specialtyService
    .deleteSpecialty( this.specialtyToDelete.id )
    .then(
      () : void => {
        this.loadSpecialtys();
      },
      ( error: Error ) : void => {
        console.log( "Error:", error );
      }
    )
    // this.dataApiService.deleteSpecialty( this.specialtyToDelete.id)
    //       .subscribe(
    //          tix => this.router.navigate(['/sumary'])
    //     );
  }
  // public deleteService(){
  //   this.serviceToDelete=this._butler.serviceToDelete;;
  //   this.serviceToDelete.status="deleted";
  //   this.toastSvc.info("Servicio borrado con exito!" );
  //   this.dataApiService.deleteService( this.serviceToDelete.id)
  //         .subscribe(
  //            tix => this.router.navigate(['/sumary'])
  //       );
  // }

public deleteService(  ) : void {
      this.serviceToDelete=this._butler.serviceToDelete;;
  this.serviceService
    .deleteService( this.serviceToDelete.id )
    .then(
      () : void => {
        this.loadServices();
      },
      ( error: Error ) : void => {
        console.log( "Error:", error );
      }
    )
  ;
}



  public deleteStylist(){
    this.stylistToDelete=this._butler.stylistToDelete;;
    this.stylistToDelete.status="deleted";
    this.toastSvc.info("Estilista borrado con exito!" );
    this.dataApiService.deleteStylist(this.stylistToDelete.id)
          .subscribe(
             tix => this.router.navigate(['/sumary'])
        );
  }
  public sendStylist(){
    this.submittedStylist=true;
    if(this.stylist.invalid){
      return
    }
    this.itemStylisty=this.stylist.value;name;
    this.itemStylisty.images=this.images;
    this.itemStylisty.status="active";
    this.itemStylisty.entity="stylist";
    this.itemStylisty.categoria=this.branchSelected;
   //     this.dataApiService.saveStylist(this.itemStylisty)
   // .subscribe((res:any) => {

   //     this.toastSvc.success("Estilista agregado con exito!" );
   //     this.router.navigate(['/sumary']);
   //   });    



 this.stylistService
    .addStylist( this.itemStylisty )
    .then(
      ( id: string ) : void => {
       // console.log( "New stylist added:", id );
       // this.addForm.name = "";
       this.toastSvc.success("Estilista agregado con exito!" );
        this.login('RyalPOS');
   
      // this.router.navigate(['/sumary']);
      },
      ( error: Error ) : void => {
        console.log( "Error:", error );
      }
    )
  ;
        this._butler.stylists=this.stylists;

        this.loadStylists();

}

   epicFunction() {
      this.deviceInfo = this.deviceService.getDeviceInfo();
      const isMobile = this.deviceService.isMobile();
      const isTablet = this.deviceService.isTablet();
      const isDesktopDevice = this.deviceService.isDesktop();
     if(isMobile){this._butler.deviceType="Celular";this._butler.grid=false;this._butler.list=true;};
     if(isTablet){this._butler.deviceType="Tablet";this._butler.grid=false;this._butler.list=false};
     if(isDesktopDevice){
      this._butler.deviceType="Escritorio";
      this._butler.grid=true;
      this._butler.list=false};

    }
    
   public myCustomValidator(file: File): Observable<boolean> {
    if (!file.name.includes('uploader')) {
      return of(true).pipe(delay(2000));
    }

    return of(false).pipe(delay(2000));
  }
  
   public onValidationError(error: ValidationError): void {
    alert(`Validation Error ${error.error} in ${error.file.name}`);
  }

  public onUploadSuccess(e: FilePreviewModel): void {
    console.log(e);
    this.images=this._butler.file;
    console.log(this.myFiles);
  }

  public  setOption(){
    this.product.categoria=this._butler.userActive.categories[this.category];
    this.showB=true;
  }
  public  setCategory(){
    this.product.categoria=this._butler.userActive.categories[this.category];
    this.showB=true;
  }
  public onRemoveSuccess(e: FilePreviewModel) {
    console.log(e);
  }
  public onFileAdded(file: FilePreviewModel) {
    this.myFiles.push(file);
  }


  public sendSpecialty(){
  this.submittedSpecialty=true;
    if(this.specialty.invalid){
      return
    }
  this.itemSpecialty=this.specialty.value;name;
  this.itemSpecialty.status="active";

 this.specialtyService
    .addSpecialty( this.itemSpecialty )
    .then(
      ( id: string ) : void => {
       // console.log( "New stylist added:", id );
        this.loadSpecialtys();
//        this._butler.specialtys=this.specialtys;
       // this.addForm.name = "";

       this.toastSvc.success("Especialidad agregada con exito!" );
      // this.router.navigate(['/sumary']);
      },
      ( error: Error ) : void => {
        console.log( "Error:", error );
      }
    )
  ;





   //     this.dataApiService.saveSpecialty(this.itemSpecialty)
   // .subscribe((res:any) => {
   //     this.toastSvc.success("Especialidad guardada con exito!" );
   //     this.router.navigate(['/sumary']);
   //   });    
}







public calculate(){
   this.loadMembers();
   this.loadCards();
   this.loadBranchs();  
}
public loadMembers(){
  this.members$=this.dataApiService.getAllMembers();
    this.members$.subscribe((data:any) => {
      let size = data.length;
      this._butler.especialistasSize=size;
    });
}
public loadCards(){
  this.cards$=this.dataApiService.getAllCategories();
    this.cards$.subscribe((data:any) => {
      let size = data.length;
      this._butler.cardsSize=size;
        this._butler.cards=[];
   for (let i=0;i<size;i++){
      this._butler.cards.push(data[i]);
      }
   
    });
}
public remove(index:any){
 this.total=this.total-this.ticketServices[index].ammount;
 this.ticketListSize=this.ticketListSize-1;
this.ticketServices.splice(index,1);
}
public addServ(){
    this._butler.serviceToAdd.ammount=this.ammount;
    this.ticketServices.push(this._butler.serviceToAdd);
    this.total=this.total+this.ammount;
    this.ammount=0;
    this.ammount=0;
    this.onAdd=false;
    this.empty=false;
    this.sendTicketFlag=true;
    this.ticketListSize=this.ticketListSize+1;
}

public addService(i:any){
  if (i==="Seleccione..."){
    return
  }
   this.submittedAddService=true;
    if(this.addServiceForm.invalid){
      return
    }
  this.onAdd=true;
  this.addTicketFlag=true;
  this._butler.serviceToAdd=this._butler.services[i];
}
public setEqual(){
  this.pay=this.total;
}
public loadBranchs(){
  this.branchs$=this.dataApiService.getAllBranchs();
    this.branchs$.subscribe((data:any) => {
    let size = data.length;
    this._butler.especialidadesSize=size;
    this._butler.branchs=[];
   for (let i=0;i<size;i++){
      this._butler.branchs.push(data[i]);
      }
    });  
}
  ngAfterViewInit(): void {
    this.login('RyalPOS');
    this.stylist = this.formBuilder.group(
      {
        name: ['', Validators.required],
      }
    );   
     this.paymmentForm = this.formBuilder.group(
      {
        // pay: [0, Validators.required],
      }
    );
    this.specialty = this.formBuilder.group(
      {
        name: ['', Validators.required],
      }
    );
    this.service = this.formBuilder.group(
      {
        name: ['', Validators.required],
        basePrice: [0, Validators.required]
      }
    );
    this.addServiceForm = this.formBuilder.group(
      {
        // ammount: [0, Validators.required]
      }
    );
    this.loadSpecialtys();

        this.loadServices();
this.calculate() 
    this.epicFunction();
    this.cdRef.detectChanges();
  }
}
