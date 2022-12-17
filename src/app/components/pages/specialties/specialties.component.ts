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
    import { ChangeDetectorRef } from '@angular/core';
    import { CapitalizeFirstPipe } from '@pipes/capitalizefirst.pipe';
    //import * as $ from 'jquery';


import { SpecialtyService } from "@app/services/specialty.service";
import { ISpecialty } from "@app/services/specialty.service";
import { PouchDBService } from "@app/services/pouchdb.service";
   interface IAddForm {
  name: string;
}
   declare var $: any;
@Component({
  selector: 'app-specialties$',
  templateUrl: './specialties.component.html',
  styleUrls: ['./specialties.component.css']
})
export class SpecialtiesComponent implements AfterViewInit {
   specialties$: any;
     public user: any;
      public addForm: IAddForm;
  public specialtys: ISpecialty[];
  private specialtyService: any;
  private pouchdbService: any;
  constructor(    private cdRef:ChangeDetectorRef,
      public script:ScriptService,
      private apollo: Apollo,
    public dataApi: DataService,
    public dataApiService: DataApiService,
      public _butler: Butler,
      public router:Router,
          specialtyService: SpecialtyService,
      pouchdbService: PouchDBService
    ) { 
  // this.categories=CATEGORIES
  // this.categories=CATEGORIES
      this.specialtyService = specialtyService;
      this.pouchdbService = pouchdbService;
      this.specialtys = [];
            this.addForm = {
        name: ""
      };
           this.user = null;

    }
public login( userIdentifier: string ) : void {
  this.pouchdbService.configureForUser( userIdentifier );
  this.user = userIdentifier;
  this.loadSpecialtys();

}
    public delete(specialty:any){
      this._butler.specialtyToDelete=specialty;
        this._butler.modalOption=5;
    }
      public loadFromRestUniversal(){
      this.specialties$=this.dataApiService.getAllBranchs();
         this.specialties$.subscribe((data:any) => {

     let size = data.length;
     // this._butler.especialidadesSize=size;
    // console.log('size: '+size)
    for (let i=0;i<size;i++){
      // console.log('origen'+data[i].name);
      this._butler.branchs.push(data[i]);
      // console.log('origen'+this._butler.branchs[i].name);
    }
  });
}

private loadSpecialtys() : void {
  this.specialtyService
    .getSpecialtys()
    .then(
      ( specialtys: ISpecialty[] ) : void => {
        this.specialtys = this.specialtyService.sortSpecialtysCollection( specialtys );
        this._butler.specialtys= this.specialtys ;
      },
      ( error: Error ) : void => {
        console.log( "Error", error );
      }
    )
  ;
}
  ngAfterViewInit(): void {
      this.login('RyalPOS');
  this.loadSpecialtys();
//    this.loadFromRestUniversal();

  }

}
