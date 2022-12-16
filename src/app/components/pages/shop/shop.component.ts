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
import { CapitalizeFirstPipe } from '@pipes/capitalizefirst.pipe';
import { StylistService } from "@app/services/stylist.service";
import { IStylist } from "@app/services/stylist.service";
import { PouchDBService } from "@app/services/pouchdb.service";

interface IAddForm {
  name: string;
}
   declare var $: any;
@Component({
  moduleId: module.id,
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements AfterViewInit {
  public addForm: IAddForm;
  public stylists: IStylist[];
	public user: any;
	private stylistService: StylistService;
	private pouchdbService: PouchDBService;
  pouchdb: any;
  members$: any;
  date="Nov 30, 2022 00:00:00";
    config: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30
  };
  products: any;
  products$: any;  
  categories: any;
  categories$: any;
  deal:any={
    name:"",
    price:""
  };
  constructor(    private cdRef:ChangeDetectorRef,
      public script:ScriptService,
      private apollo: Apollo,
      public dataApi: DataService,
      public dataApiService: DataApiService,
      public _butler: Butler,
      public router:Router,
      stylistService: StylistService,
      pouchdbService: PouchDBService
    ) { 
      this.stylistService = stylistService;
      this.pouchdbService = pouchdbService;
      this.addForm = {
        name: ""
      };
      this.stylists = [];
      this.user = null;
      //this.pouchdb = new PouchDB("pouchform");
      this.categories=CATEGORIES
    }

  openModalTicket(i:any,member:any){
    this._butler.modalOption=i;
    this._butler.stylistName=member.name
  }
  openModal(i:any){
    this._butler.modalOption=i;
  }
  loadProducts(){
    this._butler.skip=0;
    this._butler.limit=9;
  }

public deleteStylist( stylist: IStylist ) : void {
  this.stylistService
    .deleteStylist( stylist.id )
    .then(
      () : void => {
        this.loadStylists();
      },
      ( error: Error ) : void => {
        console.log( "Error:", error );
      }
    )
  ;
}
public login( userIdentifier: string ) : void {
  this.pouchdbService.configureForUser( userIdentifier );
  this.user = userIdentifier;
  this.loadStylists();

}


public logout() : void {
  this.pouchdbService.teardown();
  this.user = null;
  this.stylists = [];

}


public processAddForm() : void {
  this.addForm.name='juan';
  console.log('agregando' +this.addForm.name);
  if ( ! this.addForm.name ) {

    return;

  }

  this.stylistService
    .addStylist( this.addForm.name )
    .then(
      ( id: string ) : void => {
        console.log( "New stylist added:", id );
        this.loadStylists();
        this.addForm.name = "";
      },
      ( error: Error ) : void => {
        console.log( "Error:", error );
      }
    )
  ;
}

private loadStylists() : void {
  this.stylistService
    .getStylists()
    .then(
      ( stylists: IStylist[] ) : void => {
        this.stylists = this.stylistService.sortStylistsCollection( stylists );
      },
      ( error: Error ) : void => {
        console.log( "Error", error );
      }
    )
  ;
}


  setPreview(member:any){
    this._butler.preview=member;
    this.router.navigate(['/member']);
  }
   public viewChange(option:any){
    if(option=='grid'){
      this._butler.grid=true;
      this._butler.list=false;
    }if(option=='list'){
      this._butler.grid=false;
      this._butler.list=true;
    }
  }

  ngAfterViewInit(): void {
    this.login('RyalPOS');
    this._butler.medio=true;
    this.categories$=this.dataApi.categories$;   
    this.cdRef.detectChanges();
this.loadStylists();
//    this.loadFromRestUniversal();
  }

  public loadFromRestUniversal(){
      this.members$=this.dataApiService.getAllMembers();
  }
  loadmore(indice:any
    ){
      this._butler.skip=this._butler.skip+9; 
      this.dataApi.getDataAPI(this._butler.skip,this._butler.limit);   
      this.products$=this.dataApi.products$;  
  }
}
