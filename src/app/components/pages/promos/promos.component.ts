import { Component, OnInit } from '@angular/core';
import {Butler} from '@app/services/butler.service';
import { Router } from '@angular/router';

import { Apollo } from "apollo-angular";
import { DataService } from '@app/services/data.service';
@Component({
  selector: 'app-promos',
  templateUrl: './promos.component.html',
  styleUrls: ['./promos.component.css']
})
export class PromosComponent implements OnInit {
 products: any;
  products$: any;  
   discount: any;
  discount$: any;  
  categories: any;
  categories$: any;
  constructor(
  private apollo: Apollo,
    public dataApi: DataService,
    public _butler: Butler,
    public router:Router
    ) { }


public quick(tix:any){
    let tixToView = tix;
    this._butler.preview=tixToView;
    // this._butler.preview.quantity=1; 
    this._butler.imagePreviewProduct=this._butler.preview.images[0];
      // this.router.navigate(['/product']);
  } 
 public viewProduct(tix:any){
    let tixToView = tix;
    this._butler.preview=tixToView;
    // this._butler.preview.quantity=1; 
    this._butler.imagePreviewProduct=this._butler.preview.images[0];
      this.router.navigate(['/product']);
  } 

  ngOnInit(): void {
    this.discount$=this.dataApi.discount$;   
  }

}
