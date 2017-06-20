import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'app/services/authentication.service'
import { FormsModule, NgForm } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { MdDialogRef } from '@angular/material';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {
  returnUrl: string;

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private http: Http,
    public dialogRef: MdDialogRef<LoginComponent>,
    ) { }
    

  ngOnInit() {
    this.authenticationService.logout();
    }

  login(user: any, form: NgForm) {


      /*if(this.authenticationService.login(this.model.username, this.model.password)){
            this.router.navigate(['']);
      }*/
    this.authenticationService.login(user.username,user.password) .subscribe(
      response => {
        localStorage.setItem('id_token', response.json().access_token);
        localStorage.setItem('role', response.headers.get('Role'));
        localStorage.setItem('username', user.username);
        console.log(response.json());

        this.dialogRef.close("success");
      //  this.router.navigate(['/home']);
      },
      error => {
        debugger
        alert(error.text());
        console.log(error.text());
      }
      );
  }

  switchToReg() {
    this.dialogRef.close("toRegistration");

  }
}

