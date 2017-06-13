import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    title = 'app';
    username: string;
    isLoggedIn: boolean;

    constructor(public dialog: MdDialog) { }

    ngOnInit(): void {
        this.checkLogin()
    }

    openLoginDialog() {

        let dialogRef = this.dialog.open(LoginComponent);
        dialogRef.afterClosed().subscribe((result) => {
            if (result == undefined)
                return;

            if (result == "toRegistration") {
                this.openRegistrationDialog();
            }
            this.checkLogin();
            //  alert("succesfully login")
        },
            error => { alert("Close!"); console.log(error); }
        );

    }
    openRegistrationDialog() {
        let dialogRef = this.dialog.open(RegisterComponent);
        dialogRef.afterClosed().subscribe((result) => {
            if (result == undefined)
                return;

            if (result == "toSignIn" || result == "success") {
                this.openLoginDialog();
            }
        },
            error => { alert("Close!"); console.log(error); }
        );
    }

    checkLogin() {
        this.username = localStorage.getItem("username");

        if (this.username == null || this.username == undefined) {
            this.isLoggedIn = false;
            return;
        }
        this.isLoggedIn = true;
    }

    logout(){
        localStorage.clear();
        this.checkLogin();
    }
}
