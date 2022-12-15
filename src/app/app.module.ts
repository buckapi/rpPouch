import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@env/environment';
import { HeaderModule } from '@shared/components/header/header.module';
import { LeftSidebarModule } from '@shared/components/left-sidebar/left-sidebar.module';
import { FilterModule } from '@shared/components/filter/filter.module';
import { NotificationsModule } from './components/pages/notifications/notifications.module';
import { RouterModule } from '@angular/router';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
// SERVICES
import { Butler } from './services/butler.service';
import { HomeSelectorModule } from './shared/components/home-selector/home-selector.module';
import { FooterModule } from './shared/components/footer/footer.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MapviewComponent } from './components/mapview/mapview.component';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from './graphql.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FilePickerModule } from  'ngx-awesome-uploader';
import { ClockModule } from './components/pages/home/clock/clock.module';
//import { ClockComponent } from './components/pages/home/clock/clock.component';
import { FormsModule, ReactiveFormsModule  } from "@angular/forms";

@NgModule({ 
  declarations: [
    AppComponent,
    MapviewComponent
   // ClockComponent
  ],
  imports: [
  FormsModule,
  ReactiveFormsModule,
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    LeftSidebarModule,
    FilterModule,
    HomeSelectorModule,
    NgxUsefulSwiperModule,
    NotificationsModule,
    FooterModule, 
    FontAwesomeModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    GraphQLModule,
    FilePickerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
    })
  ],
  providers: [
    Butler
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
