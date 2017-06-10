import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute,Router } from '@angular/router';
import {AuthenticationService} from 'app/services/authentication.service'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    model: any = {};
    returnUrl: string;

    constructor(  private router :Router,     
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.authenticationService.logout();

        this.returnUrl =  '/';
    }

    login() {
        
      if(this.authenticationService.login(this.model.username, this.model.password)){
             this.router.navigate(['']);
      }
     
            
    }
}
