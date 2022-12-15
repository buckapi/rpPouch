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
const getProductsQuery = gql`
query GetProductsByStatus($status: String!) {
  getProductsByStatus(status: $status) {
    name
    descriptionidBuckidAppapicard
    presentation
    ref
    price
    status
    currency 
  }
}`;
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
   // selector: string = ".main-content";
  bestseller: any;
  bestseller$: any;
  products: any;
  card$: any;
  card: any;
  products$: any;
  prodSze$: any;
      public init:number=1;
  public end:number=12;
  private debounceTimer?:NodeJS.Timeout;
@ViewChild('mapDiv')mapDivElement!:ElementRef
@ViewChild('mysearch')myserachElement!:ElementRef

link:string=""; 
  constructor(
    private bikersService:BikersService,
    public script:ScriptService,
    private mapService:MapService,
    public router:Router,
    private apollo: Apollo,
    public dataApi: DataService,
    public dataApiService: DataApiService,
    public _butler: Butler
  ) { } 

  config: SwiperOptions = {

    a11y: { enabled: true },
    direction: 'horizontal',
    slidesPerView: 5,
    keyboard: true,
    mousewheel: false,
    scrollbar: false,
    pagination: false,
    spaceBetween: 5,
    navigation: false
  };  
  

 public quick(tix:any){
    let tixToView = tix;
    this._butler.preview=tixToView;
    // this._butler.preview.quantity=1; 
    this._butler.imagePreviewProduct=this._butler.preview.images[0];
      // this.router.navigate(['/product']);
  } 
 public viewProduct(tix:any){
    let tixToView = tix;
    this._butler.preview=tixToView;
    // this._butler.preview.quantity=1; 
    this._butler.imagePreviewProduct=this._butler.preview.images[0];
      this.router.navigate(['/product']);
  } 

public details(b:any){
  let a =b;
if(!this._butler.details){
    this._butler.details=true;
    return
  }else{
    this._butler.details=false;
  }
}
get isLoadingPlaces(){
  return this.bikersService.isLoadingPlaces;
}
get isUserLocationReady():boolean{
  return this.bikersService.isUserLocationReady;
}
get places() :Feature []{
  return this.bikersService.places; 
}
flyTo(place:Feature ){
  const   [lng,lat]=place.center; 
  // this.document.getElementById("sear").blur();
  this.mapService.flyTo([lng,lat ]);
  this.focusRemove();
  this.getDirections(place);
}
onQueryChanged(query:string=''){
  if (this.debounceTimer)clearTimeout (this.debounceTimer);
  this.debounceTimer=setTimeout (()=> {
   this.bikersService.getPlacesByQuery(query);
    // console.log(query);
  }, 350);
}
focusRemove(){
  this.myserachElement.nativeElement.blur();
}
getDirections(place:Feature){
  if (!this.bikersService.userLocation) throw Error('ubicacion no disponible');  
  const start =this.bikersService.userLocation!;
  const end =place.center as [number,number]  ;
  this.mapService.getRouteBetweenPoints(start,end);

}
 loadmore(indice:any){
      // this.products$=[];idBuckapicard
      console.log(indice);
      this._butler.end=this._butler.end+12;
      this._butler.init=this._butler.init+12;
      this._butler.skip=this._butler.skip+12; 
      this.dataApi.getDataAPI(this._butler.skip,this._butler.limit);   
      this.products$=this.dataApi.products$;  
      // this._butler.limit=this._butler.limit+12; 
  }
  loadprev(indice:any){
    if(this._butler.init>1){        
        // this.products$=[];
        console.log(indice);
        this._butler.end=this._butler.end-12;
        this._butler.init=this._butler.init-12;
        this._butler.skip=this._butler.skip-12; 
        this.dataApi.getDataAPI(this._butler.skip,this._butler.limit);   
        this.products$=this.dataApi.products$;  
         // this._butler.limit=this._butler.limit+9; 
      }
    }

  onScroll() {
    console.log("scrolled!!");
  }
  public getSize(){
    this.prodSze$=this.dataApi.getByStatus(0,0);
    console.log(JSON.stringify(this.prodSze$));
   // this._butler.results=this.prodSze$.count;


  }
  getCard(){
    this.dataApiService
    .getCardByUserId(this._butler.userId)
    .subscribe((
      card$:BuckapicardInterface) => (
        this.card$=card$,
        this._butler.cards=this.card$,
        this._butler.idBuckapicard=this._butler.cards[0].id,
        this._butler.idApp=this._butler.cards[0].idApp,
        this._butler.idBranch=this._butler.cards[0].idBranch,
        this._butler.role=this._butler.cards[0].role
      ),      
    );
  }
  ngAfterViewInit(): void {
    //  if(this._butler.isLogged==false){    
    //   this.router.navigate(['/login'])
    // }
    // this.getSize();
    let card={
      "id":"","idApp":"","idBranch":"","role":""
    }
    this._butler.cards.push(card);
    //this._butler.cards[0].id="";
    //this._butler.cards[0].idApp="";
    //this._butler.cards[0].idBranch="";
    //this._butler.cards[0].idApp="";
    // if(this._butler.isLogged==false){    
    //   this.router.navigate(['login'])
    // }
    // else{
      this.getCard();
      this.script.load(
        'demo',
        'global',
        'select',
        'dataTables',
        'datatablesIni',
        'custom',
        'deznav'
        )
       .then(data => {
        // console.log('script loaded ', data);
       }).catch(error => console.log(error));
    // }

   
   
  }
}
