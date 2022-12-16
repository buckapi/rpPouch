
// Import the core angular Tickets.
import { Injectable } from "@angular/core";

// Import the application components and Tickets.
import { IPouchDBAllDocsResult } from "@interfaces/pouchdb.interfaces";
import { IPouchDBGetResult } from "@interfaces/pouchdb.interfaces";
import { IPouchDBPutResult } from "@interfaces/pouchdb.interfaces";
import { IPouchDBRemoveResult } from "@interfaces/pouchdb.interfaces";
import { PouchDBTicket } from "@Tickets/pouchdb.Ticket";


export interface ITicket {
	id: string;
	name: string;
}

interface IPouchDBGetTicketResult extends IPouchDBGetResult {
	name: string;
}


@Injectable()
export class TicketTicket {

	private pouchdbTicket: PouchDBTicket;


	// I initialize the ticket Ticket.
	constructor( pouchdbTicket: PouchDBTicket ) {

		// Rather than constructing a PouchDB instance directly, we're going to use the
		// PouchDBTicket to provide a database instance on the fly. This way, the 
		// configuration for the PouchDB instance can be changed at any point during the
		// application life-cycle. Each database interaction starts with a call to 
		// this.getDB() to access the "current" database rather than a cached one.
		this.pouchdbTicket = pouchdbTicket;

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I add a new ticket with the given name. Returns a promise of the generated id.
	public addTicket( name: string ) : Promise<string> {
		console.log('print name:'+name);
		// NOTE: All tickets are given the key-prefix of "ticket:". This way, when we go
		// to query for tickets, we can limit the scope to keys with in this key-space.
		var promise = this.getDB()
			.put({
				_id: ( "ticket:" + ( new Date() ).getTime() ),
				name: name
			})
			.then(
				( result: IPouchDBPutResult ) : string => {

					return( result.id );

				}
			)
		;

		return( promise );

	}


	// I delete the ticket with the given id. Returns a promise.
	public deleteTicket( id: string ) : Promise<void> {

		this.testId( id );

		// NOTE: For the "delete" action, we need to perform a series of database calls.
		// In reality, these will be "instantaneous". However, philosophically, these are
		// asynchronous calls. As such, I am setting the DB to a function-local value in
		// order to ensure that both database calls - that compose the one workflow - are
		// made on the same database. This eliminates the possibility that the "current 
		// database" may change in the middle of these chained actions.
		var db = this.getDB();

		// When we delete a document, we have to provide a document that contains, at the
		// least, the "_id" and the "_rev" property. Since the calling context doesn't 
		// have this, we'll use the .get() method to get the current doc, then use that 
		// result to delete the winning revision of the document.
		var promise = db
			.get( id )
			.then(
				( doc: IPouchDBGetTicketResult ) : any => {

					return( db.remove( doc ) );

				}
			)
			.then(
				( result: IPouchDBRemoveResult ) : void => {

					// Here, I'm just stripping out the result so that the PouchDB 
					// response isn't returned to the calling context.
					return;

				}
			)
		;

		return( promise );

	}


	// I get the collection of tickets (in no particular sort order). Returns a promise.
	public getTickets() : Promise<ITicket[]> {

		var promise = this.getDB()
			.allDocs({
				include_docs: true,

				// In PouchDB, all keys are stored in a single collection. So, in order 
				// to return just the subset of "tickets" keys, we're going to query for
				// all documents that have a "ticket:" key prefix. This is known as 
				// "creative keying" in the CouchDB world.
				startkey: "ticket:",
				endKey: "ticket:\uffff"
			})
			.then(
				( result: IPouchDBAllDocsResult ) : ITicket[] => {

					// Convert the raw data storage into something more natural for the
					// calling context to consume.
					var tickets = result.rows.map(
						( row: any ) : ITicket => {

							return({
								id: row.doc._id,
								name: row.doc.name
							});

						}
					);

					return( tickets );

				}
			)
		;

		return( promise );

	}


	// I sort the given collection of tickets (in place) based on the name property.
	public sortTicketsCollection( tickets: ITicket[] ) : ITicket[] {

		tickets.sort(
			function( a: ITicket, b: ITicket ) : number {

				if ( a.name.toLowerCase() < b.name.toLowerCase() ) {

					return( -1 );

				} else {

					return( 1 );

				}

			}
		);

		return( tickets );

	}


	// I test the given id to make sure it is valid for the tickets key-space. Since all
	// PouchDB documents are stored in a single collection, we have to ensure that the 
	// given ID pertains to the subset of documents that represents tickets. If the id is
	// valid, I return quietly; otherwise, I throw an error.
	public testId( id: string ) : void {

		if ( ! id.startsWith( "ticket:" ) ) {

			throw( new Error( "Invalid Id" ) );

		}

	}


	// ---
	// PRIVATE METHODS.
	// ---


	// I return the currently-configured PouchDB instance.
	private getDB() : any {

		return( this.pouchdbTicket.getDB() );

	}
		// I update the ticket with the given id, storing the given name. Returns a promise.
	public updateTicket( id: string, name: string ) : Promise<void> {

		this.testId( id );

		// When we update an existing document in PouchDB, we have to provide the "_rev"
		// of the document we're updating, otherwise PouchDB will throw a conflict. 
		// However, since the calling context does not have the "_rev", we'll fetch the
		// document first, then update it in place, and put the resultant document back
		// into PouchDB (which will create a new revision).
		var promise = this.pouchdbTicket.getDB()
			.get( id )
			.then(
				( doc: IPouchDBGetTicketResult ) : Promise<IPouchDBPutResult> => {

					doc.name = name;

					return( this.pouchdbTicket.getDB() .put( doc ) );

				}
			)
			.then(
				( result: IPouchDBPutResult ) : void => {

					// Here, I'm just stripping out the result so that the PouchDB 
					// response isn't returned to the calling context.
					return;

				}
			)
		;

		return( promise );

	}

}