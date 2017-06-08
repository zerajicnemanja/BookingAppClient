import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { CountryComponent } from './country/country.component';
import { HttpCountryService } from './country/country.http.service';
import {LocationService} from "app/location.services"


@NgModule({
  declarations: [
    AppComponent,
    CountryComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [LocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
