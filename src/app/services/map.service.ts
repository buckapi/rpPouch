import { Injectable } from '@angular/core'; 
import {AnySourceData, LngLatLike, Map,Marker, Popup} from'mapbox-gl';
import { Feature } from '@app/interfaces/places';
import { DirectionsApiClient } from '@app/components/pages/home/api/directionsApiClient';
import {DirectionsResponse,Route }from'@app/interfaces/directions'
import { Butler } from './butler.service';
import { stringify } from 'querystring';
@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map?:Map;
 
  private markers:Marker[]=[];
  private drawPolyline(route:Route){
    if(!route.distance)throw Error('no hay que dbjar');
    this.butler.distance2=route.distance/1000;
    this.butler.distance=(route.distance/1000).toFixed(2);
    this.butler.duration=route.duration/60;
    this.butler.placeholder=""+this.butler?.distance.toString()+" Km";
    console.log({
      kms: route.distance/1000, duration:route.duration/60
    });
    const coords=route.geometry.coordinates;
    const sourceData: AnySourceData={
      type:'geojson',
      data:{
          type: 'FeatureCollection',
          features :[
            {
              type:'Feature',
              properties:{},
              geometry:{
                type:'LineString',
                coordinates: coords 
              }
            }
          ]
      }
    }
    //limpiar ruta previa
    if(this.map?.getLayer('RouteString')){
      this.map?.removeLayer('RouteString');
      this.map?.removeSource('RouteString');
    }
    this.map?.addSource('RouteString',sourceData);
    this.map?.addLayer({
      id:'RouteString',
      type: 'line',
      source: 'RouteString',
      layout:{
        'line-cap':'round',
        'line-join':'round'
      },
      paint: {
        'line-color':'blue',
        'line-width':6
      }  
    })
  }
constructor(private directionsApi:DirectionsApiClient,
  public butler:Butler){

}
  get isMapReady(){
    return !!this.map;
  }
  createMarkersFromPlaces(places:Feature[]){
    if(!this.map)throw Error('mapnot');
    this.markers!.forEach(marker=>marker.remove());
    const newMarkers=[];
    for (const place of places){
      const [lng,lat  ]=place.center;
      const popup =new Popup()
      .setHTML(`
      <h6>${place.text}</h6>
      </span>${place.place_name}</span>
        `);
        const newMarker = new Marker()
        .setLngLat([lng,lat])  
        .setPopup(popup)
        .addTo(this.map);
        newMarkers.push(newMarker);  
    }
    this.markers=newMarkers;
  }
  setMap (map:Map){
    this.map=map;
  }
  flyTo(coords:LngLatLike){
    if (!this.isMapReady)throw Error('map isnot ');
    this.map?.flyTo({
      zoom:14,
      center:coords
    });
    
  }
  getRouteBetweenPoints(start:[number,number], end: [number,number]) {
    this.directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(', ')}`)
    .subscribe(resp=>this.drawPolyline(resp.routes[0]));
  }  
  
}
