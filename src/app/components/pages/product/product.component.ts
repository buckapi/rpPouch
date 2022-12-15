import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwiperOptions } from 'swiper';
import {Butler} from '@app/services/butler.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
    config: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30
  };
  element:any;
public quantity : number=1; 
public sent : boolean=false; 
public subTotalGral : number=0; 
public preview :any={
  quantity:1,
  image:"",
  subTotal:0,
  product:"",

}; public tixToAdd :any={
  quantity:1,
  image:"",
  subTotal:0,
  product:"",

}; 
public editing:boolean=false
  constructor(
public _butler:Butler,
   public router:Router
    ) { }
  public minus(){
  if (this.quantity>1){
    this.quantity=this.quantity-1;
  }
}
public plus(){
  this.quantity=this.quantity+1;
}
public calculate(){
  this.subTotalGral=0;
  let indice = this._butler.car.length;
    for (let i = 0; i < indice; i++){
      this.subTotalGral=this.subTotalGral+this._butler.car[i].subTotal;
      this._butler.subTotalGral=this.subTotalGral;
  
    }
    this.sent=true;
     this.router.navigate(['/shop']);
}
  public addToBag(quantity:any){
    //console.log(quantity);
     this._butler.numProd=this._butler.numProd+1;
       this.tixToAdd.onCar=true;
     if(this._butler.numProd>=3){
       this.tixToAdd.onCar=false;
this._butler.hidden=true;
     }
       this.tixToAdd.quantity=quantity;
       this.tixToAdd.name=this._butler.preview.name;
       this.tixToAdd.price=this._butler.preview.price;
       this.tixToAdd.images=this._butler.preview.images;
  //   this.tixToAdd=this._butler.preview;
     this._butler.subTotal=this._butler.subTotal+(quantity*this._butler.preview.price);
   // console.log(JSON.stringify(this.tixToAdd));
     this._butler.car.push(this.tixToAdd);
   //     $('#modal1').removeClass("is-visible");

 this.preview.product=this._butler.preview;
  this.preview.quantity=this.quantity;
  this.preview.image=this._butler.imagePreviewProduct;
  this.preview.subTotal=this.quantity*this.preview.product.price;
//  this._butler.car.push(this.preview);
  this.calculate();
  this.tixToAdd={};
  this.quantity=1;


    }
  ngOnInit(): void {
  }

}
