import { Component, AfterViewInit } from '@angular/core';
import {Butler} from '@app/services/butler.service';
import { Router } from '@angular/router';
import { Apollo } from "apollo-angular";
import { DataService } from '@app/services/data.service'; 
import { DataApiService } from '@app/services/data-api.service'; 
import gql from "graphql-tag";
import { ScriptService } from '@app/services/script.service';
import { ScriptStore } from '@app/services/script.store';
import {CATEGORIES} from '@app/services/categories.service';
import { SwiperOptions } from 'swiper';
import { DealInterface } from '@app/interfaces/deal';
    import { ChangeDetectorRef } from '@angular/core';
    import { CapitalizeSecondPipe } from '@pipes/capitalizesecond.pipe';
   
    @Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements AfterViewInit {

  products: any;
  products$: any;  
  categories: any;
   grid:boolean=false;
   list:boolean=false;
  categories$: any;
     public init:number=1;
  public end:number=12;
  constructor( private cdRef:ChangeDetectorRef,
      public script:ScriptService,
      private apollo: Apollo,
    public dataApi: DataService,
    public dataApiService: DataApiService,
      public _butler: Butler,
      public router:Router
      ) { 
     
    
        // To start out, the Friends collection will be empty; and, it must remain 
        // empty until the user logs-in because, until then, the PouchDB database has
        // not been configured and we won't know where to read data from.
        
        
        this.categories=CATEGORIES
      this.script.load(     
        'popper',
        'bootstrap',      
        'script'     
      )
      .then(data => {
      //  console.log('loaded from shop', data);
      })
      .catch(error => console.log(error)); }
loadProducts(){
    this._butler.skip=0;
    this._butler.limit=12;

     
  }







// jin

 
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
    loadmore(indice:any
    ){
    // this.products$=[];
    console.log(indice);
    this.end=this.end+12;
    this.init=this.init+12;
     this._butler.skip=this._butler.skip+12; 
      this.dataApi.getDataAPI(this._butler.skip,this._butler.limit);   
     this.products$=this.dataApi.products$;  
     // this._butler.limit=this._butler.limit+9; 


  }
  loadprev(indice:any
    ){
    if(this.init>1){
      
    // this.products$=[];
    console.log(indice);
    this.end=this.end-12;
    this.init=this.init-12;
     this._butler.skip=this._butler.skip-12; 
      this.dataApi.getDataAPI(this._butler.skip,this._butler.limit);   
     this.products$=this.dataApi.products$;  
     // this._butler.limit=this._butler.limit+9; 
    }


  }
  ngAfterViewInit(): void {
    if(this._butler.deviceType=='Escritorio'){
        this.list=true;
        this.grid=false;
      }
      else{
        this.list=false;
        this.grid=true;
      }
     this.products$=this.dataApi.products$;   
     this.categories$=this.dataApi.categories$;   
 
 this.cdRef.detectChanges();
   // this.loadProducts();
  }

}
