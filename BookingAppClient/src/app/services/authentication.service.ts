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
    /*this.http.post('http://localhost:54042/oauth/token', `username=${username}&password=${password}&grant_type=password`)
                    .map((response: Response) => {
                let user = response.json();
                if (user && user.token) {                
                
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.loggedIn=true;                
                }
            });
            return this.loggedIn;
    } */
    
    logout() {
        localStorage.removeItem('currentUser');
    }
}  
