import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { CountryComponent } from './country/country.component';
import { LocationService } from "app/location.services"
import { FormsModule} from '@angular/forms';
import { MaterialModule} from '@angular/material';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegionComponent } from './region/region.component';
import { PlaceComponent } from './place/place.component';
import { DialogRegionComponent } from './region/dialog-region-component';
import { DialogCountryComponent } from './country/dialog-country-component';
import { DialogPlaceComponent } from './place/dialog-place-component';
@NgModule({
  declarations: [
    AppComponent,
    CountryComponent,
    RegionComponent,
    PlaceComponent,
    DialogRegionComponent,
    DialogCountryComponent,
    DialogPlaceComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule 
  ],
  providers: [LocationService],
  bootstrap: [
    AppComponent,
    DialogCountryComponent,
    DialogRegionComponent,
    DialogPlaceComponent]
})
export class AppModule { }
