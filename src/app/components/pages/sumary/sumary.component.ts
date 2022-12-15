import { Component, AfterViewInit } from '@angular/core';
import {Butler} from '@app/services/butler.service';
import { DataApiService } from '@app/services/data-api.service'; 

@Component({
  selector: 'app-sumary',
  templateUrl: './sumary.component.html',
  styleUrls: ['./sumary.component.css']
})
export class SumaryComponent implements AfterViewInit {
branchs$:any;
    members$: any;
    cards$: any;
  constructor(
      public _butler: Butler,
    public dataApiService: DataApiService
    ) { }
public calculate(){
   this.loadMembers();
   this.loadCards();
   this.loadBranchs();  
}
public loadMembers(){
  this.members$=this.dataApiService.getAllMembers();
    this.members$.subscribe((data:any) => {
      let size = data.length;
      this._butler.especialistasSize=size;
    });
}
public loadCards(){
  this.cards$=this.dataApiService.getAllCategories();
    this.cards$.subscribe((data:any) => {
      let size = data.length;
      this._butler.cardsSize=size;
    });
}
public loadBranchs(){
  this.branchs$=this.dataApiService.getAllBranchs();
    this.branchs$.subscribe((data:any) => {
    let size = data.length;
    this._butler.especialidadesSize=size;
    this._butler.branchs=[];
   for (let i=0;i<size;i++){
      this._butler.branchs.push(data[i]);
      }
    });  
}
  ngAfterViewInit(): void {
    this.calculate();
    this._butler.medio=false;
  }

}
