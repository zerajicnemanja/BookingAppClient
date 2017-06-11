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
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded'); 

       this.http.post('http://localhost:54042/oauth/token', `username=${username}&password=${password}&grant_type=password`)
       .subscribe(
        response => {
          localStorage.setItem('id_token', response.json().id_token);
          this.loggedIn=false;
          this.router.navigate(['home']);
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
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
