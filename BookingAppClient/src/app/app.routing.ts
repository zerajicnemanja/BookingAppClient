import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from 'app/guard/auth.guard';
import { CountryComponent } from './country/country.component';
import { RegionComponent } from "app/region/region.component";
import { PlaceComponent } from "app/place/place.component";
import { AccomodationComponent } from 'app/accomodation/accomodation.component';
import { AccomodationTypeComponent } from './accomodation-type/accomodation-type.component';
import { AccommodationDetailsComponent } from "app/accommodation-details/accommodation-details.component";

const appRoutes: Routes = [
    // { path: 'country', component: CountryComponent,canActivate:[AuthGuard]},
    { path: 'country', component: CountryComponent },
    { path: 'region', component: RegionComponent },
    { path: 'place', component: PlaceComponent },
    { path: 'accomodation', component: AccomodationComponent },
    { path: 'accomodation_type', component: AccomodationTypeComponent },
    { path: 'accommodation-details/:Id', component: AccommodationDetailsComponent }

];

export const routing = RouterModule.forRoot(appRoutes);