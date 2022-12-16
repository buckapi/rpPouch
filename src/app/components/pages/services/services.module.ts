import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ServicesComponent } from './services.component';
import { ServiceService } from "@services/service.service";
import { PouchDBService } from "@services/pouchdb.service";

@NgModule({
  declarations: [
    ServicesComponent
  ],
    providers:[
    ServiceService,
    PouchDBService
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule
  ]
})
export class ServicesModule { }
