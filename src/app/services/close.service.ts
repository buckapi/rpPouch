import { Injectable } from "@angular/core";
import { IPouchDBAllDocsResult } from "@interfaces/pouchdb.interfaces";
import { IPouchDBGetResult } from "@interfaces/pouchdb.interfaces";
import { IPouchDBPutResult } from "@interfaces/pouchdb.interfaces";
import { IPouchDBRemoveResult } from "@interfaces/pouchdb.interfaces";
import { PouchDBService } from "@services/pouchdb.service";


export interface IClose {
	id: string;
	method: string;
	stylist: string;
	status: string;
	statusClose: string;
	customer: string;
	total: number;
	cobro: number;
	cambio: number;
	npedido: number;
	createdAt: string;
	entity: string;
	closeServices: [string];
}

interface IPouchDBGetCloseResult extends IPouchDBGetResult {
	stylist: string;
}

@Injectable()
export class CloseService {

	private pouchdbService: PouchDBService;
	constructor( pouchdbService: PouchDBService ) {
		this.pouchdbService = pouchdbService;
	}

	public addClose( close: any ) : Promise<string> {
		console.log('print close:'+close.stylist);
		var promise = this.getDB()
			.put({
				_id: ( "close:" + ( new Date() ).getTime() ),
				stylist: close.stylist,
				method: close.method,
				status: close.status,
				statusClose: close.statusClose,
				customer: close.customer,
				total: close.total,
				cobro: close.cobro,
				cambio: close.cambio,
				npedido: close.npedido,
				createdAt: close.createdAt,
				entity: close.entity,
				closeServices: close.closeServices
			})
			.then(
				( result: IPouchDBPutResult ) : string => {

					return( result.id );

				}
			);
		return( promise );
	}

	public deleteClose( id: string ) : Promise<void> {
		this.testId( id );
		var db = this.getDB();
		var promise = db
			.get( id )
			.then(
				( doc: IPouchDBGetCloseResult ) : any => {
					return( db.remove( doc ) );
				}
			)
			.then(
				( result: IPouchDBRemoveResult ) : void => {
					return;
				}
			)
		return( promise );
	}

	public getClose() : Promise<IClose[]> {
		var promise = this.getDB()
			.allDocs({
				include_docs: true,
				startkey: "close:",
				endKey: "close:\uffff"
			})
			.then(
				( result: IPouchDBAllDocsResult ) : IClose[] => {
					var closes = result.rows.map(
						( row: any ) : IClose => {
							return({
								id: row.doc._id,
								stylist: row.doc.stylist,
								method: row.doc.method,
								status: row.doc.status,
								statusClose: row.doc.statusClose,
								customer: row.doc.customer,
								total: row.doc.total,
								cobro: row.doc.cobro,
								cambio: row.doc.cambio,
								npedido: row.doc.npedido,
								createdAt: row.doc.createdAt,
								entity: row.doc.entity,
								closeServices: row.doc.closeServices
							});
						}
					);
					return( closes );
				}
			);
		return( promise );
	}


	public sortClosesCollection( closes: IClose[] ) : IClose[] {
		closes.sort(
			function( a: IClose, b: IClose ) : number {
				if ( a.stylist.toLowerCase() < b.stylist.toLowerCase() ) {
					return( -1 );
				} else {
					return( 1 );
				}
			}
		);
		return( closes );
	}

	public testId( id: string ) : void {
		if ( ! id.startsWith( "close:" ) ) {
			throw( new Error( "Invalid Id" ) );
		}
	}

	private getDB() : any {
		return( this.pouchdbService.getDB() );
	}

	public updateClose( id: string, stylist: string ) : Promise<void> {
		this.testId( id );
		var promise = this.pouchdbService.getDB()
			.get( id )
			.then(
				( doc: IPouchDBGetCloseResult ) : Promise<IPouchDBPutResult> => {
					doc.stylist = stylist;
					return( this.pouchdbService.getDB() .put( doc ) );
				}
			)
			.then(
				( result: IPouchDBPutResult ) : void => {
						return;
				}
			);
		return( promise );
	}

}