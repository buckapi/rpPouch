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
import { FriendService } from "@app/services/friend.service";
import { IFriend } from "@app/services/friend.service";
import { PouchDBService } from "@app/services/pouchdb.service";

interface IAddForm {
  name: string;
}

    //import * as $ from 'jquery';
   declare var $: any;
@Component({

  moduleId: module.id,
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements AfterViewInit {
  public addForm: IAddForm;
  public friends: IFriend[];
	public user: any;

	private friendService: FriendService;
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
      friendService: FriendService,
      pouchdbService: PouchDBService
    ) { 
      this.friendService = friendService;
      this.pouchdbService = pouchdbService;
  
      this.addForm = {
        name: ""
      };
      this.friends = [];
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

// inijio

// I delete the given friend from the list.
public deleteFriend( friend: IFriend ) : void {

  this.friendService
    .deleteFriend( friend.id )
    .then(
      () : void => {

        this.loadFriends();

      },
      ( error: Error ) : void => {

        console.log( "Error:", error );

      }
    )
  ;

}


// I login the user with the given identifier. 
public login( userIdentifier: string ) : void {

  // Now that a new user is logging in, we want to teardown any existing PouchDB
  // database and reconfigure a new PouchDB database for the given user. This way,
  // each user gets their own database in our database-per-user model.
  // --
  // CAUTION: For simplicity, this is in the app-component; but, it should probably 
  // be encapsulated in some sort of "session" service.
  this.pouchdbService.configureForUser( userIdentifier );
  this.user = userIdentifier;

  // Once the new database is configured (synchronously), load the user's friends.
  this.loadFriends();

}


// I log the current user out.
public logout() : void {

  // When logging the user out, we want to teardown the currently configured 
  // PouchDB database. This way, we can ensure that rogue asynchronous actions
  // aren't going to accidentally try to interact with the database.
  // --
  // CAUTION: For simplicity, this is in the app-component; but, it should probably 
  // be encapsulated in some sort of "session" service.
  this.pouchdbService.teardown();
  this.user = null;

  this.friends = [];

}


// I process the "add" form, creating a new friend with the given name.
public processAddForm() : void {
  this.addForm.name='juan';
  console.log('agregando' +this.addForm.name);
  if ( ! this.addForm.name ) {

    return;

  }

  this.friendService
    .addFriend( this.addForm.name )
    .then(
      ( id: string ) : void => {

        console.log( "New friend added:", id );

        this.loadFriends();
        this.addForm.name = "";

      },
      ( error: Error ) : void => {

        console.log( "Error:", error );

      }
    )
  ;

}


// ---
// PRIVATE METHODS.
// ---


// I load the persisted friends collection into the list.
private loadFriends() : void {

  this.friendService
    .getFriends()
    .then(
      ( friends: IFriend[] ) : void => {

        // NOTE: Since the persistence layer is not returning the data 
        // in any particular order, we're going to explicitly sort the 
        // collection by name.
        this.friends = this.friendService.sortFriendsCollection( friends );

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
    this._butler.medio=true;
    this.categories$=this.dataApi.categories$;   
    this.cdRef.detectChanges();
    this.loadFromRestUniversal();
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
