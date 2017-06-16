import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Country } from './country.model';
import { Observable } from "rxjs/Observable";
import { HttpCountryService } from './country.http.service';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { DialogcountryComponent } from '../dialogcountry/dialogcountry.component';
import { NotificationService } from '../services/notification.service';
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  providers: [HttpCountryService]
})
export class CountryComponent implements OnInit {

  private countries: Array<Country>;

  constructor(private httpCountryService: HttpCountryService, public dialog: MdDialog, public snackbar: MdSnackBar,private notificationService:NotificationService) {
  }

  ngOnInit() {
    this.httpCountryService.getCountries().subscribe((res: any) => {
      this.countries = res; console.log(this.countries)
    },
      error => { alert("Unsuccessful fetch operation! Country"); console.log(error); }
    );
  }
  openAddDialog() {
    this.notificationService.sendHello();
    let dialogRef = this.dialog.open(DialogcountryComponent);
    dialogRef.componentInstance.title = "Adding new Country";
    dialogRef.componentInstance.isEditing = false;
    dialogRef.afterClosed().subscribe((result: Country) => {

      if (result == undefined || null) {
        return;//case when you click outside the dialog
      }
      this.snackbar.open('Country ' + result.Name + ' successfuly added', "", { duration: 3000 });
      this.ngOnInit();

    })
  }

  editCountry(country: Country) {
    console.log("Start editing " + country.Name);

    let dialogRef = this.dialog.open(DialogcountryComponent);
    dialogRef.componentInstance.title = "Editing Country"
    dialogRef.componentInstance.country = country;
    dialogRef.componentInstance.isEditing = true;
    
    dialogRef.afterClosed().subscribe((result: Country) => {

      if (result == undefined || null) {
        return;//case when you click outside the dialog
      }
      this.snackbar.open('Country ' + result.Name + ' successfuly edited', "", { duration: 3000 });
      this.ngOnInit();
    })
  }
  deleteCountry(country: Country) {

    console.log("Start deleting " + country.Name);
    this.httpCountryService.deleteCountry(country).subscribe(
      () => {
        console.log('Country ' + country.Name + ' successfuly deleted');
        this.ngOnInit();
      },
      error => { alert("Unsuccessful deleting operation!"); console.log(error); }
    );
  }
}



