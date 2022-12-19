import { Component, AfterViewInit } from '@angular/core';
import {Butler} from '@app/services/butler.service';
import { DataApiService } from '@app/services/data-api.service'; 
import { TicketService } from "@services/ticket.service";
import { ITicket } from "@app/services/ticket.service";
import { PouchDBService } from "@app/services/pouchdb.service";
declare var $: any;

@Component({
  selector: 'app-sumary',
  templateUrl: './sumary.component.html',
  styleUrls: ['./sumary.component.css']
})
export class SumaryComponent implements AfterViewInit {
    public tickets: ITicket[];
    acumulado=0;
    public ticketsPending: ITicket[];
    // private ticketService: TicketService;
    public user: any
    // private pouchdbService: PouchDBService;
    branchs$:any; 
    members$: any;
    cards$: any;
  constructor(
    public _butler: Butler,
    public dataApiService: DataApiService,
    public ticketService: TicketService,
    public  pouchdbService: PouchDBService
    ) { 
      this.user = null;
      this.ticketService = ticketService;
      this.tickets = [];
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
            this._butler.tickets=this.tickets;
             this.calculate();
          },
          ( error: Error ) : void => {
            console.log( "Error", error );
          }
        )
      ;
    }
    public calculate(){
      this.acumulado=0;
    let ticketsSize = this.tickets.length;
      for (let i=0;i<ticketsSize;i++){
        if(this.tickets[i].statusClose=='pending' ){
          this.acumulado=this.acumulado+this.tickets[i].total;
        }
      }
      console.log("size: "+ticketsSize+" acumulado: "+this.acumulado); 
    }
  ngAfterViewInit(): void {
    this.acumulado=0;
    this.login('RyalPOS');
    this.loadTickets();
    this._butler.medio=false;
  }

}
