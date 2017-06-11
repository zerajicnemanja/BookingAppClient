import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from 'app/guard/auth.guard';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent,canActivate:[AuthGuard]},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    
];

export const routing = RouterModule.forRoot(appRoutes);