import PouchDB from 'pouchdb';
export class PouchDBService {
	private db: any;
	constructor() {
		this.db = null;
	}

	public configureForUser( userIdentifier: string ) : void {
// let userIdentifier='ben';
		this.teardown();
		this.db = new PouchDB( this.getDatabaseName( userIdentifier ) );
		console.warn( "Configured new PouchDB database for,", this.db.name );
	}

	public getDB() : any {
		if ( ! this.db ) {
			throw( new Error( "Database is not available - please configure an instance." ) );
		}
		return( this.db );
	}

	public teardown() : void {
		if ( ! this.db ) {
			return;
		}
		//this.db.close();
		//this.db = null;
	}

	private getDatabaseName( userIdentifier: string ) : string {
		var dbName = userIdentifier
			.toLowerCase()
			.replace( /[^a-z0-9_$()+-]/g, "-" )
		;
		return( "DB " + dbName );
	}
}