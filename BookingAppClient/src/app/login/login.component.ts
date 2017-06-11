import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute,Router } from '@angular/router';
import {AuthenticationService} from 'app/services/authentication.service'
import { FormsModule } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    model: any = {};
    returnUrl: string;

    constructor(  private router :Router,     
        private authenticationService: AuthenticationService,
        private http:Http) { }

    ngOnInit() {
        this.authenticationService.logout();

        this.returnUrl =  '/';
    }

    login() {
        
      /*if(this.authenticationService.login(this.model.username, this.model.password)){
             this.router.navigate(['']);
      }*/
        this.http.post('http://localhost:54042/oauth/token', `username=${this.model.username}&password=${this.model.password}&grant_type=password`)
       .subscribe(
        response => {
          localStorage.setItem('id_token', response.json().access_token);
          localStorage.setItem('role', response.headers.get('Role'));   
          localStorage.setItem('username', this.model.username);       
              

          console.log(response.json());
          this.router.navigate(['/home']);
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
    }
     
            
    }

