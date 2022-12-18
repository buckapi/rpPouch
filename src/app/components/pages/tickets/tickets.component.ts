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
import { TicketService } from "@services/ticket.service";
import { ITicket } from "@app/services/ticket.service";
import { PouchDBService } from "@app/services/pouchdb.service";
   declare var $: any;

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements AfterViewInit {
    public tickets: ITicket[];
  private ticketService: TicketService;
    public user: any

  private pouchdbService: PouchDBService;
  tickets$: any;
  ticket:any={
    npedido: ''
  }
  constructor(  private cdRef:ChangeDetectorRef,
      public script:ScriptService,
      private apollo: Apollo,
      public dataApi: DataService,
      public dataApiService: DataApiService,
      public _butler: Butler,
      public router:Router,
         ticketService: TicketService,
      pouchdbService: PouchDBService
      ) {
 this.user = null;
   this.ticketService = ticketService;
 this.tickets = [];
this.pouchdbService = pouchdbService;
       }
      public loadFromRestUniversal(){
      this.tickets$=this.dataApiService.getAllRppoders();
  }
   public login( userIdentifier: string ) : void {
    this.pouchdbService.configureForUser( userIdentifier );
    this.user = userIdentifier;this.loadTickets();
  }
  openModalTicket(i:any,ticket:any){
    this._butler.modalOption=i;
    this._butler.ticket=ticket;
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
  ngAfterViewInit(): void {
       this.login('RyalPOS');
    this.loadTickets();
//        this.loadFromRestUniversal();
  }

}
