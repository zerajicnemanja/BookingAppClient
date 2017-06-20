import { Component, OnInit, Input, NgZone } from '@angular/core';
import { MdDialog } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationService } from 'app/services/authentication.service';
import { NotificationService } from './services/notification.service';
import { Router } from '@angular/router';

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
    zone: NgZone;
    role: string = "Anonymus"

    navLinks = [
        {
            route: ['/country'],
            label: "Country",
            permission:['Admin']
        },
        {
            route: ['/region'],
            label: "Region",
            permission:['Admin']
            
        },
        {
            route: ['/place'],
            label: "Place",
            permission:['Admin']
        },
        {
            route: ['/accomodation'],
            label: "Accomodation",
            permission:['Admin','Manager','User','Anonymus']
        },
        {
            route: ['/accomodation_type'],
            label: "Accomodation Type",
            permission:['Admin']
        },

        {
            route: ['/reservations'],
            label: "Reservations",
            permission:['Admin','Manager','User']
        }
    ]
    constructor(
        public dialog: MdDialog,
        private router: Router,
        public authService: AuthenticationService, 
        private notificationService: NotificationService
        ) { }

    ngOnInit(): void {
        this.checkLogin();
        if (this.role == "Admin") {
            this.notificationService.adminNotificationReceived.subscribe(e => this.notify(e));
        } else if (this.role == "Manager") {
            this.notificationService.managerNotificationReceived.subscribe(e => this.notify(e));
        }
        this.zone = new NgZone({ enableLongStackTrace: false });
    }

    notify(data: Array<any>) {
        this.zone.run(() => {
            if (this.role == "Admin") {
                this.notificationList = data;
            } else {
                this.notificationList.push(data);
            }
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
        this.notificationList = [];
        this.username = localStorage.getItem("username");

        if (this.username == null || this.username == undefined) {
            this.isLoggedIn = false;
            return;
        }
        this.role = localStorage.getItem("role");
        if(this.role == undefined){
            this.role = "Anonymus";
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

    openAcc(acc_id:number){
        this.router.navigate(['accommodation-details/'+acc_id]);
        if(this.role == "Manager"){
            this.notificationList= [];
        }
    }

    isInRole(link:any){
        if(link.permission.indexOf(this.role) !== -1) {
            return true;
        }
        return false;
    }
}
