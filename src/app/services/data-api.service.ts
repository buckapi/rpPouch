	import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders }  from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Butler } from "@app/services/butler.service";

export interface OrderInterface {

}
export interface ServiceInterface {

}
export interface StylistInterface {

}
export interface SpecialtyInterface {

}
export interface TicketInterface {

}
export interface SerialInterface {
	serialT:string,
}
@Injectable({
  providedIn: 'root'
})
export class DataApiService {
		ticket: Observable<any>;
	cards:any;
	branch:any;
	cierre:any;
	serial:any;
	transactions:any;
	members:any;
  constructor(
  	public butler:Butler, 
 	 private http: HttpClient
  	) {}
  	headers : HttpHeaders = new HttpHeaders({  		
		  "Content-Type":"application/json"	
	});
	getTransationByBranch(branch: string){
		const url_api = `https://db.buckapi.us:7001/api/transactions?filter[where][idBranch]=${branch}`;
		this.transactions = this.http.get(url_api);
		return ( this.http.get(url_api));		
	}

	getAllBranchs(){
		const url_api = 'https://db.buckapi.us:7001/api/branchs';
		return this.http.get(url_api);
	}
	getAllCategories(){
		const url_api = 'https://db.buckapi.us:7001/api/cards';
		return this.http.get(url_api);
	}
	getAllTransactions(){
		const url_api = 'https://db.buckapi.us:7001/api/transactions';
		return this.http.get(url_api);
	}
	getAllRppoders(){
		const url_api = 'https://db.buckapi.us:7001/api/rpporders';
		return this.http.get(url_api);
	}
	getAllMembers(){
		const url_api = 'https://db.buckapi.us:7001/api/members';
		return this.http.get(url_api);
	}
	updateSpecialty(specialty :SpecialtyInterface, id: string){
		const url_api=`https://db.buckapi.us:7001/api/branchs/${id}`;
		return this.http
		.put<SpecialtyInterface>(url_api, specialty)
		.pipe(map(data => data));
	}
	deleteSpecialty( id: string){
		const url_api=`https://db.buckapi.us:7001/api/branchs/${id}`;
		return this.http
		.delete<SpecialtyInterface>(url_api)
		.pipe(map(data => data));
	}
	deleteService(id: string){
		// let token = this.authService.getToken();
		const url_api=`https://db.buckapi.us:7001/api/cards/${id}`;
		return this.http
		.delete<ServiceInterface>(url_api)
		.pipe(map(data => data));
	}
	deleteStylist(id: string){
		const url_api=`https://db.buckapi.us:7001/api/members/${id}`;
		return this.http
		.delete<StylistInterface>(url_api)
		.pipe(map(data => data));
	}
	getProduct(id: string){
		const url_api = `https://db.buckapi.us:7001/api/products/${id}`;
		return this.http.get(url_api);
	}

	getCierresByBranch(branch: string){
		const url_api = `https://db.buckapi.us:7001/api/infos?filter[where][idBranch]=${branch}`;
		this.cierre = this.http.get(url_api);
		return ( this.http.get(url_api));		
	}

	getCardByUserId(userId: string){
		const url_api = `https://db.buckapi.us:3069/api/cards?filter[where][userId]=${userId}`;
		this.cards = this.http.get(url_api);
		return ( this.http.get(url_api));		
	}
	getSerialT(branch: string){
		const url_api = `https://db.buckapi.us:7001/api/branchs/${branch}`;
		this.branch = this.http.get(url_api);
		this.butler.serialT=this.branch.serialT;
		return ( this.branch);		
	}
setSerialT(serial:SerialInterface, branch: string){
		// let token = this.authService.getToken();
		const url_api = `https://db.buckapi.us:7001/api/branchs/${branch}`;
		return this.http
		.put<SerialInterface>(url_api, serial)
		.pipe(map(data => data));
	}


	saveTicket(ticket :TicketInterface){
		const url_api='https://db.buckapi.us:7001/api/transactions';
		return this.http
		.post<TicketInterface>(url_api, ticket)
		.pipe(map(data => data));
	}
	saveService(service :ServiceInterface){
		const url_api='https://db.buckapi.us:7001/api/cards';
		return this.http
		.post<ServiceInterface>(url_api, service)
		.pipe(map(data => data));
	}
	
	saveSpecialty(specialty :SpecialtyInterface){
		const url_api='https://db.buckapi.us:7001/api/branchs';
		return this.http
		.post<SpecialtyInterface>(url_api, specialty)
		.pipe(map(data => data));
	}
	saveOrder(order :OrderInterface){
		const url_api='https://db.buckapi.us:7001/api/rpporders';
		return this.http
		.post<OrderInterface>(url_api, order)
		.pipe(map(data => data));
	}
	saveStylist(stylist :StylistInterface){
		const url_api='https://db.buckapi.us:7001/api/members';
		return this.http
		.post<StylistInterface>(url_api, stylist)
		.pipe(map(data => data));
	}
}