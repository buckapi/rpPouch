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
import { CloseService } from "@services/close.service";
import { IClose } from "@app/services/close.service";
import { PouchDBService } from "@app/services/pouchdb.service";
@Component({
  selector: 'app-closelist',
  templateUrl: './closelist.component.html',
  styleUrls: ['./closelist.component.css']
})
export class CloselistComponent implements AfterViewInit {
    public closes: IClose[];
  private closeService: CloseService;
    public user: any

  private pouchdbService: PouchDBService;

  close:any={
    date: ''
  }
  constructor(
 private cdRef:ChangeDetectorRef,
      public script:ScriptService,
      private apollo: Apollo,
      public dataApi: DataService,
      public dataApiService: DataApiService,
      public _butler: Butler,
      public router:Router,
         closeService: CloseService,
      pouchdbService: PouchDBService
    ) { 

 this.user = null;
   this.closeService = closeService;
 this.closes = [];
this.pouchdbService = pouchdbService;
  }
  private loadCloses() : void {
  this.closeService
    .getClose()
    .then(
      ( closes: IClose[] ) : void => {
        this.closes = this.closeService.sortClosesCollection( closes );
        this._butler.closes=this.closes;
      },
      ( error: Error ) : void => {
        console.log( "Error", error );
      }
    )
  ;
}
  public login( userIdentifier: string ) : void {
    this.pouchdbService.configureForUser( userIdentifier );
    this.user = userIdentifier;this.loadCloses();
  }
  ngAfterViewInit(): void {
      this._butler.closes=[];
    this.login('RyalPOS');
      this.loadCloses();
  }

}
