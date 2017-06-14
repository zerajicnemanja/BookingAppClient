import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {  Router } from '@angular/router';


@Injectable()
export class AuthenticationService {

    public loggedIn:boolean;
    private response :Response;

    constructor(private http: Http,private router:Router) { 
        this.loggedIn=false;
    }

    login(username: string, password: string) {
        
    }            
    logout() {
        localStorage.removeItem('currentUser');
    }
}  
