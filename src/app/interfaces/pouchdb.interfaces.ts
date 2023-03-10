
// CAUTION: There is currently no up-to-date "Definitely Typed" set of interfaces for
// PouchDB. So, in an effort to help me learn about the PouchDB API, I'm providing a few
// tiny interfaces here so I can get a better idea of what data is available.

export interface IPouchDBAllDocsResult {
	offset: number;
	total_rows: number;
	rows: IPouchDBRow[];
}

export interface IPouchDBGetResult {
	statusClose: string;
	_id: string;
	_rev: string;
}

export interface IPouchDBPutResult {
	statusClose: string;
	ok: boolean;
	id: string;
	rev: string;
}

export interface IPouchDBRemoveResult {
	ok: boolean;
	id: string;
	rev: string;
}

export interface IPouchDBRow {
	id: string;
	key: string;
	value: { rev: string };

	// Only included if include_docs is set to true during query.
	doc?: any; 
}