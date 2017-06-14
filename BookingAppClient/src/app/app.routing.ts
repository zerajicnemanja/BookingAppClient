import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from 'app/guard/auth.guard';
import { CountryComponent } from './country/country.component';

const appRoutes: Routes = [
   // { path: 'country', component: CountryComponent,canActivate:[AuthGuard]},
    { path: 'country', component: CountryComponent},
    { path: 'region', component: LoginComponent },
    { path: 'place', component: RegisterComponent },
    
];

export const routing = RouterModule.forRoot(appRoutes);