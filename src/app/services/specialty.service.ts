
import { Injectable } from "@angular/core";
import { IPouchDBAllDocsResult } from "@interfaces/pouchdb.interfaces";
import { IPouchDBGetResult } from "@interfaces/pouchdb.interfaces";
import { IPouchDBPutResult } from "@interfaces/pouchdb.interfaces";
import { IPouchDBRemoveResult } from "@interfaces/pouchdb.interfaces";
import { PouchDBService } from "@services/pouchdb.service";

export interface ISpecialty {
	id: string;
	name: string;
}

interface IPouchDBGetSpecialtyResult extends IPouchDBGetResult {
	name: string;
}


@Injectable()
export class SpecialtyService {
	private pouchdbService: PouchDBService;
	constructor( 
		pouchdbService: PouchDBService 
		){
		this.pouchdbService = pouchdbService;
	}

	public addSpecialty( name: string ) : Promise<string> {
		console.log('print name:'+name);
			var promise = this.getDB()
			.put({
				_id: ( "specialty:" + ( new Date() ).getTime() ),
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

	public deleteSpecialty( id: string ) : Promise<void> {
		this.testId( id );
		var db = this.getDB();
		var promise = db
			.get( id )
			.then(
				( doc: IPouchDBGetSpecialtyResult ) : any => {
					return( db.remove( doc ) );
				}
			)
			.then(
				( result: IPouchDBRemoveResult ) : void => {
					return;
				}
			)
		;
		return( promise );
	}

	public getSpecialtys() : Promise<ISpecialty[]> {
		var promise = this.getDB()
			.allDocs({
				include_docs: true,
				startkey: "specialty:",
				endKey: "specialty:\uffff"
			})
			.then(
				( result: IPouchDBAllDocsResult ) : ISpecialty[] => {
					var specialtys = result.rows.map(
						( row: any ) : ISpecialty => {
							return({
								id: row.doc._id,
								name: row.doc.name
							});
						}
					);
					return( specialtys );
				}
			)
		return( promise );
	}

	public sortSpecialtysCollection( specialtys: ISpecialty[] ) : ISpecialty[] {
		specialtys.sort(
			function( a: ISpecialty, b: ISpecialty ) : number {
				if ( a.name.toLowerCase() < b.name.toLowerCase() ) {
					return( -1 );
				} else {
					return( 1 );
				}
			}
		);
		return( specialtys );
	}

	public testId( id: string ) : void {
		if ( ! id.startsWith( "specialty:" ) ) {
			throw( new Error( "Invalid Id" ) );
		}
	}

	private getDB() : any {
		return( this.pouchdbService.getDB() );
	}
	
	public updateSpecialty( id: string, name: string ) : Promise<void> {
		this.testId( id );
		var promise = this.pouchdbService.getDB()
			.get( id )
			.then(
				( doc: IPouchDBGetSpecialtyResult ) : Promise<IPouchDBPutResult> => {
					doc.name = name;
					return( this.pouchdbService.getDB() .put( doc ) );
				}
			)
			.then(
				( result: IPouchDBPutResult ) : void => {
					return;
				}
			)
		return( promise );
	}

}