import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Feature, PlacesResponse } from '@app/interfaces/places';
import { PlacesApiClient } from '@app/components/pages/home/api/placesApiClient';
import { MapService } from '.';
@Injectable({
  providedIn: 'root'
})
export class BikersService {
  public userLocation?:  [number,number];
  public isLoadingPlaces:boolean=false;
  public places: Feature  []=[];
  get isUserLocationReady():boolean{
    return !!this.userLocation;
  }
  
  constructor(
    private mapService:MapService,
    private placesApi:PlacesApiClient) {
    // this.getUserLocation();
   }
  public async  getUserLocation():Promise<[number,number]>{
    return new Promise( (resolve,reject)=>{
      navigator.geolocation.getCurrentPosition(
        ( {coords})=>{
          this.userLocation= [coords.longitude,coords.latitude] ;
          resolve (this.userLocation );
          console.log(this.userLocation);
        },
        (err)=>{
          alert('nose pudo obtener la gelocalizacion');
          console.log(err);
          reject();
        }
      );
    });
  }

  getPlacesByQuery(query: string=''){ 
    if( query.length===0){
      this.isLoadingPlaces=false;
      this.places=[];
      return;
    }
    if (!this.userLocation) throw Error('no userlocation');
    this.isLoadingPlaces=true;
    this.placesApi.get<PlacesResponse>(`/${query}.json`,{
      params: {
        proximity:this.userLocation.join(',')  
    } 
  })
    .subscribe(resp=>{
      console.log(resp.features)
      this.isLoadingPlaces=false;
      this.places=resp.features;
      this.mapService.createMarkersFromPlaces(this.places);
    });
  }

}
