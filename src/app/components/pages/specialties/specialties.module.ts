import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialtiesRoutingModule } from './specialties-routing.module';
import { SpecialtiesComponent } from './specialties.component';
import { SpecialtyService } from "@services/specialty.service";
import { PouchDBService } from "@services/pouchdb.service";



@NgModule({
  declarations: [
    SpecialtiesComponent
  ],
    providers:[
    SpecialtyService,
    PouchDBService
  ],
  imports: [
    CommonModule,
    SpecialtiesRoutingModule
  ]
})
export class SpecialtiesModule { }
