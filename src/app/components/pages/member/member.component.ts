import { Component, AfterViewInit } from '@angular/core';
import { Butler } from '@services/butler.service';
import { Router } from '@angular/router';
import { TicketService } from "@services/ticket.service";
import { ITicket } from "@app/services/ticket.service";
import { PouchDBService } from "@app/services/pouchdb.service";

 
@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements AfterViewInit {
  public tickets: ITicket[];
  private ticketService: TicketService;
  public user: any
  private pouchdbService: PouchDBService;
  constructor(
    private readonly router: Router,
    public _butler:Butler,       
    ticketService: TicketService,
    pouchdbService: PouchDBService
  ) {
      this.user = null;
      this.ticketService = ticketService;
      this.tickets = [];
      this.pouchdbService = pouchdbService;
    }
   openModalTicket(i:any,ticket:any){
    this._butler.modalOption=i;
    this._butler.ticket=ticket;
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
      },
      ( error: Error ) : void => {
        console.log( "Error", error );
      }
    )
  ;
}
    public delete(){
      this._butler.stylistToDelete=this._butler.preview;
      this._butler.modalOption=7;
    }
  ngAfterViewInit(): void {
      this.login('RyalPOS');
    this.loadTickets();
  }

}
