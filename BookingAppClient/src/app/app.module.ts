import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { CountryComponent, AddEditCountryDialog } from './country/country.component';
import { HttpCountryService } from './country/country.http.service';
import {LocationService} from "app/location.services"
import { FormsModule }   from '@angular/forms';
import { MaterialModule} from '@angular/material';
import { NoopAnimationsModule,BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    CountryComponent,
    AddEditCountryDialog
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [LocationService],
  bootstrap: [AppComponent,AddEditCountryDialog]
})
export class AppModule { }
