import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { CountryComponent } from './country/country.component';
import { HttpCountryService } from './country/country.http.service';
import {LocationService} from "app/location.services";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component'
import {routing} from 'app/app.routing'
import { FormsModule }    from '@angular/forms';
import {AuthGuard} from 'app/guard/auth.guard';
import {RegisterService} from 'app/services/register.service';
import {AuthenticationService} from 'app/services/authentication.service';
import { AccomodationComponent } from './accomodation/accomodation.component';
import { AccomodationTypeComponent } from './accomodation-type/accomodation-type.component';
import { CommentComponent } from './comment/comment.component';
import { CommentListComponent } from './comment-list/comment-list.component'
import { MaterialModule, OverlayContainer } from '@angular/material';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegionComponent } from './region/region.component';
import { PlaceComponent } from './place/place.component';
import { DialogRegionComponent } from './region/dialog-region-component';
import { DialogPlaceComponent } from './place/dialog-place-component';
import { AccommodationDialogComponent } from './accommodation-dialog/accommodation-dialog.component';
import { DialogcountryComponent } from './dialogcountry/dialogcountry.component';
import { SearchComponent } from './search/search.component';
import { MySnackBarComponent } from "app/mysnackbar.component";
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import { MapDialogComponent } from './map-dialog/map-dialog.component';
import { AccommodationDetailsComponent } from "app/accommodation-details/accommodation-details.component";
import {RatingModule} from "ngx-rating"
import {ButtonModule} from 'primeng/primeng';
import { NotificationService } from './services/notification.service';
@NgModule({
   declarations: [
    AppComponent,
    CountryComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AccomodationComponent,
    AccomodationTypeComponent,
    CommentComponent,
    CommentListComponent,
    RegionComponent,
    PlaceComponent,
    DialogRegionComponent,
    AccommodationDialogComponent,
    DialogcountryComponent,
    DialogPlaceComponent,
    SearchComponent,
    MySnackBarComponent,
    MapComponent,
    MapDialogComponent,
    AccommodationDetailsComponent
  ],
  entryComponents:[
    DialogRegionComponent,
    DialogcountryComponent,
    DialogPlaceComponent,
    AccommodationDialogComponent,
    MySnackBarComponent,
    MapDialogComponent,
    LoginComponent,
    RegisterComponent
    ],
  imports: [
    RatingModule,
    BrowserModule,
    HttpModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    routing,
    AgmCoreModule.forRoot({
      
      apiKey: 'AIzaSyDnihJyw_34z5S1KZXp90pfTGAqhFszNJk'
    }),
    ButtonModule
  ],
  providers: [LocationService,  AuthenticationService,AuthGuard,RegisterService,NotificationService],

  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.themeClass = 'my-dark-theme';
  }
 }
