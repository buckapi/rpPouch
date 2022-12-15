import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
Mapboxgl.accessToken = 'pk.eyJ1IjoiZnJ1dG1lIiwiYSI6ImNsMDQ2MW02OTBicWMzYnF3bnZ6aWs0dmcifQ.J6L3_p4NQ9G7LdyIsPWbow';

if (!navigator.geolocation){
  alert("navegador no soportado");
  throw new Error ("navegador no soportado");
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
