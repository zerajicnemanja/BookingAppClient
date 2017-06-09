import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
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

    constructor(
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.authenticationService.logout();

        this.returnUrl =  '/';
    }

    login() {
        var a;
        this.authenticationService.login(this.model.username, this.model.password).subscribe((res:any) => {
          a = res
        });
            
    }
}
