import { Component, OnInit, Input, NgZone } from '@angular/core';
import { MdDialog } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationService } from 'app/services/authentication.service';
import { NotificationService } from './services/notification.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    title = 'app';
    username: string;
    isLoggedIn: boolean;
    @Input() notificationList: Array<any> = [];
    length: string;
    zone: NgZone;

    navLinks = [
        {
            route: ['/country'],
            label: "Country"
        },
        {
            route: ['/region'],
            label: "Region"
        },
        {
            route: ['/place'],
            label: "Place"
        },
        {
            route: ['/accomodation'],
            label: "Accomodation"
        },
        {
            route: ['/accomodation_type'],
            label: "Accomodation Type"
        }
    ]
    constructor(public dialog: MdDialog, public authService: AuthenticationService, private notificationService: NotificationService) { }

    ngOnInit(): void {
        this.checkLogin();
        //this.notificationService.notificationReceived.subscribe(e => this.notify(e))
        this.zone = new NgZone({ enableLongStackTrace: false });
    }

    notify(data: Array<any>) {
        this.zone.run(() => {
            this.notificationList = data;
            this.length = "" + data.length;
            console.log(data);
        });

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
            location.reload();
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

    logout() {

        this.authService.logout().subscribe(
            () => {
                localStorage.clear();
                this.checkLogin();
                location.reload();

            },
            error => { alert("Logout failed!"); console.log(error); });

    }
}
