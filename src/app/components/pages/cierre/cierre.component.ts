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
import { CloseService } from "@services/close.service";
import { IClose } from "@app/services/close.service";
import { ITicket } from "@app/services/ticket.service";
import { PouchDBService } from "@app/services/pouchdb.service";

@Component({
  selector: 'app-cierre',
  templateUrl: './cierre.component.html',
  styleUrls: ['./cierre.component.css']
})
export class CierreComponent implements AfterViewInit {
 public tickets: ITicket[];
  private ticketService: TicketService; 
  public closes: IClose[];
  private closeService: CloseService;
  public user: any
    acumulado:number=0;

  private pouchdbService: PouchDBService;
  tickets$: any;
  ticket:any={
    npedido: ''
  }
  constructor(
     private cdRef:ChangeDetectorRef,
      public script:ScriptService,
      private apollo: Apollo,
      public dataApi: DataService,
      public dataApiService: DataApiService,
      public _butler: Butler,
      public router:Router,
         ticketService: TicketService,
         closeService: CloseService,
        pouchdbService: PouchDBService) {
        this.user = null;
        this.ticketService = ticketService;
        this.closeService = closeService;
        this.tickets = [];
        this.closes = [];
        this.pouchdbService = pouchdbService;
       }
          public login( userIdentifier: string ) : void {
    this.pouchdbService.configureForUser( userIdentifier );
    this.user = userIdentifier;this.loadTickets();
  }
 private loadTickets() : void {
  this.ticketService
    .getTickets()
    .then(
      ( tickets: ITicket[] ) : void => {
        this.tickets = this.ticketService.sortTicketsCollection( tickets );
        let ticketsSize=this.tickets.length;
        this._butler.tickets= [];
        this.acumulado=0;
        for (let i=0; i<ticketsSize;i++){
          if(this.tickets[i].statusClose=='pending'){
            this._butler.tickets.push(this.tickets[i]);
            this.acumulado=this.acumulado+this.tickets[i].total;
          }
        }
       
      },
      ( error: Error ) : void => {
        console.log( "Error", error );
      }
    )
  ;
}
public  procesar(){
  let ticketsSize = this._butler.tickets.length;
  for (let i =0;i<ticketsSize;i++){

  }
}
  ngAfterViewInit(): void {
    this.login('RyalPOS');
      this.loadTickets();
  }

}
