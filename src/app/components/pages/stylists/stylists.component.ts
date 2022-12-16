import { Component, AfterViewInit } from '@angular/core';
import {Butler} from '@app/services/butler.service';
import { Router } from '@angular/router';

import { ScriptService } from '@app/services/script.service';
import { ScriptStore } from '@app/services/script.store';
//import {CATEGORIES} from '@app/services/categories.service';
//import { SwiperOptions } from 'swiper';
//import { DealInterface } from '@app/interfaces/deal';
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
  selector: 'app-stylists',
  templateUrl: './stylists.component.html',
  styleUrls: ['./stylists.component.css']
})
export class StylistsComponent implements AfterViewInit {
  public addForm: IAddForm;
  public stylists: IStylist[];
  public user: any;

  private stylistService: StylistService;
  private pouchdbService: PouchDBService;
  pouchdb: any;
  constructor(
      private cdRef:ChangeDetectorRef,
      public script:ScriptService,
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
  }
  openModalTicket(i:any,member:any){
    this._butler.modalOption=i;
    this._butler.stylistName=member.name
  }
  openModal(i:any){
    this._butler.modalOption=i;
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
    this.user = userIdentifier;this.loadStylists();
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
    this.loadStylists();
  }

}
