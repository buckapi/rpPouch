import { Component, OnInit } from '@angular/core';
import { Butler } from '@services/butler.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  constructor(
  private readonly router: Router,
    public _butler:Butler

    ) { }
    public delete(){
      this._butler.stylistToDelete=this._butler.preview;
      this._butler.modalOption=7;
    }
  ngOnInit(): void {
  }

}
