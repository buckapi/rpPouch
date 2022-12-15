import { Component, OnInit } from '@angular/core';
import { Butler } from '@services/butler.service';
import { Router } from '@angular/router';
import {LOCATIONS} from '@app/services/locations.service';
import { AuthRESTService } from '@services/authREST.service';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
    form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  fee:any=0;
    locations: any = [
      {
        prov: '',
        cities: [{city:'',tax:0}]
      }
    ]; 
      submitted = false;
public isError = false;
public waiting = false;
public message = '';

 public citiesList:any=[];
 public user:any={};
 public citySelected:any=[];
 public indexProvincia:any=999; 
 provSelected:any=false;
 cityObjSelected:any=false;
  constructor(
    private readonly router: Router,
    public _butler:Butler,
    private formBuilder: FormBuilder,
    public AuthRESTService:AuthRESTService
    ) {
      this.locations=LOCATIONS
     }
      get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  public setProv(index:any){
  this.provSelected=true;
  let size = this.locations[index].cities.length;
  this.indexProvincia=index;
  for (let j =0;j<size;j++){
    this.citiesList.push(this.locations[index].cities[j]);
  }
}
  public onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.user.email=this.form.value.email;
    this.user.password=this.form.value.password; 
    this.register();
  }

  public register(){


  
 //  this.toastSvc.success(this.mensaje, 'Usuaio registrado');
   // this.ticket.status="completed";   
    this.AuthRESTService
        .registerUser( 
          this.user.email, 
          this.user.password 
        //  this.user.password, 
        //  this.user.status, 
        //  this.user.userType
          )
        .subscribe(
          user => {    
        //  this._uw.card=user;
          this.AuthRESTService.setUser(user);
          const token = user.id;
        //  this.cardSubmit.userd='p'+token;
        //  this._uw.userd=this.cardSubmit.userd;  
          this.AuthRESTService.setToken(token);
          }, 
          error => {
                if(error.status==422){
                this.isError = true;
                this.waiting=false;
                this.message="La dirección de correo ya se encuentra registrada";
              }
          }
        );
/*
     this.dataApiService.saveTicket(this.ticket)
   .subscribe((res:any) => {
     this._butler.ticket=[];
       this.ticket=null;
       this.setSerialT();
       this.router.navigate(['/labceltransactions']);
     });*/  

     //console.log(JSON.stringify(this.options));
}
  public setCity(i:any){
  this.cityObjSelected=true;
  this.citySelected=this.locations[this.indexProvincia].cities[i];
  this.fee=this.locations[this.indexProvincia].cities[i].tax;
}
  ngOnInit(): void {
      this.form = this.formBuilder.group(
      {        
        email: ['', Validators.required],
        password: ['', Validators.required]
      }    
    );
  }
}
