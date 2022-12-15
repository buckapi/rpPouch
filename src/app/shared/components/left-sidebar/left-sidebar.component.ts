import { Component, OnInit } from '@angular/core';
import { Butler } from '@app/services/butler.service';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent implements OnInit {

  constructor(
    public _butler:Butler
  ) { }

  ngOnInit(): void {
    if (!this._butler.biker) {console.log("dato:"+this._butler.biker);}
  }
 
}
