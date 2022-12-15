import { Component, OnInit } from '@angular/core';
import { Butler } from '@services/butler.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
  private readonly router: Router,
    public _butler:Butler
    ) { }
  public minus(index:any){
    let quantityFLAG=this._butler.car[index].quantity;
    if (quantityFLAG>1){
     // quantityFLAG=quantityFLAG--1;
      this._butler.car[index].quantity=this._butler.car[index].quantity-1;
    this.calculate();
    }
  }
  public plus(index:any){
    this._butler.car[index].quantity=this._butler.car[index].quantity+1;
    this.calculate();
  }
   public remove(index:any){
    this._butler.numProd=this._butler.numProd-1;
    this._butler.car.splice(index,1);
    this.calculate();
  }
  public calculate(){
    if (this._butler.numProd==0){
        this._butler.subTotal=0;
        this.router.navigate(['']);
    }
    let subTotalFLAG=this._butler.subTotal
    subTotalFLAG=0;
    let indice = this._butler.car.length;
      for (let i = 0; i < indice; i++){
        this._butler.car[i].subTotal=this._butler.car[i].quantity*this._butler.car[i].price;
        subTotalFLAG=subTotalFLAG+this._butler.car[i].subTotal;
        this._butler.subTotal=subTotalFLAG;  
      }
      //this.sent=true;
        // this.router.navigate(['/shop']);
  }
  ngOnInit(): void {
  }

}
