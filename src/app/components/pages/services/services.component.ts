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

import { ServiceService } from "@app/services/service.service";
import { IService } from "@app/services/service.service";
import { PouchDBService } from "@app/services/pouchdb.service";

    import { ChangeDetectorRef } from '@angular/core';
    import { CapitalizeFirstPipe } from '@pipes/capitalizefirst.pipe';
    //import * as $ from 'jquery';
   declare var $: any;
   interface IAddForm {
  name: string;
}
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements AfterViewInit {
 public addForm: IAddForm;
  public services: IService[];
  public user: any;
  private serviceService: ServiceService;
  private pouchdbService: PouchDBService;
  pouchdb: any;
 services$: any;
  constructor(    private cdRef:ChangeDetectorRef,
      public script:ScriptService,
      private apollo: Apollo,
      public dataApi: DataService,
      public dataApiService: DataApiService,
      public _butler: Butler,
      public router:Router,
          serviceService: ServiceService,
      pouchdbService: PouchDBService
    ) { 
  // this.categories=CATEGORIES
      this.serviceService = serviceService;
      this.pouchdbService = pouchdbService;
      this.services = [];
            this.addForm = {
        name: ""
      };
           this.user = null;
    }
    public delete(service:any){
      this._butler.serviceToDelete=service;
      this._butler.modalOption=6;
    }
      public loadFromRestUniversal(){
      this.services$=this.dataApiService.getAllCategories();
         this.services$.subscribe((data:any) => {

     let size = data.length;
     // this._butler.especialidadesSize=size;
    // console.log('size: '+size)
    for (let i=0;i<size;i++){
      // console.log('origen'+data[i].name);
      // this._butler.branchs.push(data[i]);
      // console.log('origen'+this._butler.branchs[i].name);
    }
  });
}
public login( userIdentifier: string ) : void {
  this.pouchdbService.configureForUser( userIdentifier );
  this.user = userIdentifier;
  this.loadServices();

}
private loadServices() : void {
  this.serviceService
    .getServices()
    .then(
      ( services: IService[] ) : void => {
        this.services = this.serviceService.sortServicesCollection( services );
        this._butler.services= this.services ;
      },
      ( error: Error ) : void => {
        console.log( "Error", error );
      }
    )
  ;
}


  ngAfterViewInit(): void {
     this.login('RyalPOS');
    this.loadServices();
//    this.loadFromRestUniversal();

  }


}
