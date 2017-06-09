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

import {AuthenticationService} from 'app/services/authentication.service'


@NgModule({

  declarations: [
    AppComponent,
    CountryComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
  FormsModule,
    routing
  ],
  providers: [LocationService,  AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
