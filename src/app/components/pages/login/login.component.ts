import { Component, Input,OnInit } from '@angular/core';
import { Butler } from '@app/services/butler.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { ACTIONS } from '@shared/constants/constant';
import { ApiError, User, UserCredentials } from '@supabase/gotrue-js';
import { ToastrService } from 'ngx-toastr';
import {CARDS} from '@app/services/cards.service';
export interface OptionsForm {
  id: string;
  label: string;
}
interface UserReponse extends User, ApiError { }
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   authForm !: FormGroup;
  signIn = ACTIONS.signIn;
  @Input() options!: OptionsForm;
  public cards:any=[];
size=0;
  constructor(
    private readonly authSvc: AuthService,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    public _butler:Butler,
    private readonly toastSvc: ToastrService,
  ) {
  this.cards=CARDS
   }

  ngOnInit(): void {
    this.initForm();
  }

  async onSubmit(): Promise<void> {
    const credentials: UserCredentials = this.authForm.value;
    let actionToCall = this.authSvc.signIn(credentials);
    actionToCall = this.authSvc.signIn(credentials);
    try {
      const result = await actionToCall as UserReponse;
      if (result.email) {
        this.toastSvc.success("Bienvenido a RyalPOS!");
        this.size = this.cards.length;
            this._butler.email=result.email;
// console.log(JSON.stringify(this.cards))
            this._butler.idResult= result.id;

       //  console.log("id Result "+this._butler.idResult);
        this._butler.isLogged=true;
        this.redirectUser();
      } else {
        this.toastSvc.info(result.message, 'Info');
      }
    } catch (error) {
      console.log(error);
    }
  }

  private initForm(): void {
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  private redirectUser(): void {
            //console.log("idCard: " +this.cards);
     for(let i=0;i<this.size;i++){
           // console.log("idCard: " +this.cards[i].userId);
//1            console.log("sizas: " +this._butler.userId);
          if(this._butler.idResult==this.cards[i].userId){
            this._butler.userId=this.cards[i].userId;
            this._butler.branch=this.cards[i].branch;
            this._butler.userType=this.cards[i].userType;         
            this._butler.idBranch=this.cards[i].idBranch;
            this._butler.idCard=this.cards[i].idCard;
            this._butler.admin=this.cards[i].admin;
            this._butler.userActive=this.cards[i];
            this._butler.idApp=this.cards[i].idApp;
          }
        }
            console.log("user Cative: " +this._butler.admin);
    this.router.navigate(['/sumary']);
  }

}
