import { Component, OnInit } from '@angular/core';
import { Butler } from '@app/services/butler.service';

@Component({
  selector: 'app-home-selector',
  templateUrl: './home-selector.component.html',
  styleUrls: ['./home-selector.component.css']
})
export class HomeSelectorComponent implements OnInit {

  constructor(
    public _butler:Butler
  ) { }

  ngOnInit(): void {
  }
 public selectHome(){
   if (!this._butler.biker){
    this._butler.biker=true;
    this._butler.type="Biker";
    return
  }
   if (this._butler.biker){
    this._butler.biker=false;
    this._butler.type="Passenger";
    return
  }
 }

}
