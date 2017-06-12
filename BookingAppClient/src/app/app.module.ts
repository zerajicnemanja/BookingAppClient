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
import { RoomComponent } from './room/room.component';
import { RoomReservationComponent } from './room-reservation/room-reservation.component';
import { CommentComponent } from './comment/comment.component';
import { CommentListComponent } from './comment-list/comment-list.component'


@NgModule({

  declarations: [
    AppComponent,
    CountryComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AccomodationComponent,
    AccomodationTypeComponent,
    RoomComponent,
    RoomReservationComponent,
    CommentComponent,
    CommentListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
  FormsModule,
    routing
  ],
  providers: [LocationService,  AuthenticationService,AuthGuard,RegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
