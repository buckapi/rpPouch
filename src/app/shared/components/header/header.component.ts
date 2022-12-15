import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Butler } from '@app/services/butler.service';
import { ScriptService } from '@app/services/script.service';
import { ScriptStore } from '@app/services/script.store';
import { SwiperOptions } from 'swiper';
import { BikersService } from '@app/services';
import { AuthService } from '@services/auth.service';
import { faCoffee, faUser } from '@fortawesome/free-solid-svg-icons';
import {CATEGORIES} from '@app/services/categories.service';
//import * as $ from 'jquery';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {
 faCoffee = faCoffee;
 faUser = faUser;
 checked:any=false;
  link:string="";  
  public categories:any=[];
  constructor(
    public _butler:Butler,
        private readonly authSvc: AuthService,
    public script:ScriptService,
    public router:Router
  ) {
  this.categories=CATEGORIES
    
      /*   this.script.load(     
       'glightbox',
          'swiper'
      )
      .then(data => {
      //  console.log('loaded from shop', data);
      })
      .catch(error => console.log(error));*/
   }

  config: SwiperOptions = {
    a11y: { enabled: true },
    direction: 'horizontal',
    slidesPerView: 5,
    keyboard: true,
    mousewheel: false,
    scrollbar: false,
    pagination: false,
    spaceBetween: 5,
    navigation: false
  };  

  public details(b:any){
    let a =b;
    if (a==1){this.link="assets/assets/img/user4.jpg";}
    if (a==2){this.link="assets/assets/img/user10.jpg";}
    if (a==3){this.link="assets/assets/img/user40.jpg";}
    if (a==4){this.link="assets/assets/img/user2.jpg";}
    if (a==5){this.link="assets/assets/img/user20.jpg";}
    if (a==6){this.link="assets/assets/img/user3.jpg";}
  if(!this._butler.details){
    this._butler.details=true;
    return
  }else{
    this._butler.details=false;
  }
  
  }

async onLogout(): Promise<void> {
    try {
      await this.authSvc.signOut();
      this._butler.isLogged=false;
       this.router.navigate(['/login']);
       this._butler.userId="";
    } catch (error) {
      console.log(error);
    }
  }

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




  public remove(index:any){
    this._butler.numProd=this._butler.numProd-1;
    this._butler.car.splice(index,1);
    this.calculate();
  }

public viewCart(){
        $('#carrito').removeClass("active");
        //$('#body').addClass("");
         $('body').removeClass('offCanvas__minicart_active');
       this.router.navigate(['/cart']);
}
public viewCheckout(){
        $('#carrito').removeClass("active");
        //$('#body').addClass("");
         $('body').removeClass('offCanvas__minicart_active');
       this.router.navigate(['/checkout']);
}
public check(){
  this.checked=!this.checked;
}
  public edit(){
    this._butler.editing=true;
  }





  ngAfterViewInit(): void {
   this.checked=false;
  }

}
