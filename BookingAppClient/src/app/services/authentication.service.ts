import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { LocationService } from 'app/location.services';


@Injectable()
export class AuthenticationService {

    public loggedIn: boolean;
    private response: Response;

    constructor(private http: Http, private router: Router, public locationService: LocationService) {
        this.loggedIn = false;
    }

    login(username: string, password: string) {

        return this.http.post(this.locationService.RootLocation + 'oauth/token', `username=${username}&password=${password}&grant_type=password`);

    }
    logout() {
        const headers: Headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.post(this.locationService.RootLocation + 'api/Account/Logout', null,opts);

    }
}  
