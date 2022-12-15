import { Component, OnInit } from '@angular/core';
import {Butler} from '@app/services/butler.service';
import { DataApiService } from '@app/services/data-api.service'; 
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(
   public dataApiService: DataApiService,
     public _butler: Butler
    ) { }

  ngOnInit(): void {
  }

}
