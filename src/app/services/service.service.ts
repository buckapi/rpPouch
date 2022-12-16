
// Import the core angular services.
import { Injectable } from "@angular/core";

// Import the application components and services.
import { IPouchDBAllDocsResult } from "@interfaces/pouchdb.interfaces";
import { IPouchDBGetResult } from "@interfaces/pouchdb.interfaces";
import { IPouchDBPutResult } from "@interfaces/pouchdb.interfaces";
import { IPouchDBRemoveResult } from "@interfaces/pouchdb.interfaces";
import { PouchDBService } from "@services/pouchdb.service";


export interface IService {
	id: string;
	name: string;
	basePrice: string;

}

interface IPouchDBGetServiceResult extends IPouchDBGetResult {
	name: string;
}


@Injectable()
export class ServiceService {

	private pouchdbService: PouchDBService;


	// I initialize the service service.
	constructor( pouchdbService: PouchDBService ) {

		// Rather than constructing a PouchDB instance directly, we're going to use the
		// PouchDBService to provide a database instance on the fly. This way, the 
		// configuration for the PouchDB instance can be changed at any point during the
		// application life-cycle. Each database interaction starts with a call to 
		// this.getDB() to access the "current" database rather than a cached one.
		this.pouchdbService = pouchdbService;

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I add a new service with the given name. Returns a promise of the generated id.
	public addService( name: any ) : Promise<string> {
		console.log('print name:'+name.name);
		// NOTE: All services are given the key-prefix of "service:". This way, when we go
		// to query for services, we can limit the scope to keys with in this key-space.
		var promise = this.getDB()
			.put({
				_id: ( "service:" + ( new Date() ).getTime() ),
				name: name.name,
				basePrice: name.basePrice,
			})
			.then(
				( result: IPouchDBPutResult ) : string => {

					return( result.id );

				}
			)
		;

		return( promise );

	}


	// I delete the service with the given id. Returns a promise.
	public deleteService( id: string ) : Promise<void> {

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
				( doc: IPouchDBGetServiceResult ) : any => {

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


	// I get the collection of services (in no particular sort order). Returns a promise.
	public getServices() : Promise<IService[]> {

		var promise = this.getDB()
			.allDocs({
				include_docs: true,

				// In PouchDB, all keys are stored in a single collection. So, in order 
				// to return just the subset of "services" keys, we're going to query for
				// all documents that have a "service:" key prefix. This is known as 
				// "creative keying" in the CouchDB world.
				startkey: "service:",
				endKey: "service:\uffff"
			})
			.then(
				( result: IPouchDBAllDocsResult ) : IService[] => {

					// Convert the raw data storage into something more natural for the
					// calling context to consume.
					var services = result.rows.map(
						( row: any ) : IService => {

							return({
								id: row.doc._id,
								name: row.doc.name,
								basePrice: row.doc.basePrice,

							});

						}
					);

					return( services );

				}
			)
		;

		return( promise );

	}


	// I sort the given collection of services (in place) based on the name property.
	public sortServicesCollection( services: IService[] ) : IService[] {

		services.sort(
			function( a: IService, b: IService ) : number {

				if (a.name !==undefined  && b.name !==undefined && a.name.toLowerCase() < b.name.toLowerCase() ) {

					return( -1 );

				} else {

					return( 1 );

				}

			}
		);

		return( services );

	}


	// I test the given id to make sure it is valid for the services key-space. Since all
	// PouchDB documents are stored in a single collection, we have to ensure that the 
	// given ID pertains to the subset of documents that represents services. If the id is
	// valid, I return quietly; otherwise, I throw an error.
	public testId( id: string ) : void {

		if ( ! id.startsWith( "service:" ) ) {

			throw( new Error( "Invalid Id" ) );

		}

	}


	// ---
	// PRIVATE METHODS.
	// ---


	// I return the currently-configured PouchDB instance.
	private getDB() : any {

		return( this.pouchdbService.getDB() );

	}
		// I update the service with the given id, storing the given name. Returns a promise.
	public updateService( id: string, name: string ) : Promise<void> {

		this.testId( id );

		// When we update an existing document in PouchDB, we have to provide the "_rev"
		// of the document we're updating, otherwise PouchDB will throw a conflict. 
		// However, since the calling context does not have the "_rev", we'll fetch the
		// document first, then update it in place, and put the resultant document back
		// into PouchDB (which will create a new revision).
		var promise = this.pouchdbService.getDB()
			.get( id )
			.then(
				( doc: IPouchDBGetServiceResult ) : Promise<IPouchDBPutResult> => {

					doc.name = name;

					return( this.pouchdbService.getDB() .put( doc ) );

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