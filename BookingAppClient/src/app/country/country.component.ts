import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Country } from './country.model';
import { Observable } from "rxjs/Observable";
import { HttpCountryService } from './country.http.service';
import {MdDialog, MdDialogRef} from '@angular/material';
import { DialogcountryComponent } from '../dialogcountry/dialogcountry.component';
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  providers: [HttpCountryService]
})
export class CountryComponent implements OnInit {

  private countries: Array<Country>;

    constructor(private httpCountryService: HttpCountryService, public dialog: MdDialog) { 
        }
 
    ngOnInit() {
      this.httpCountryService.getCountries().subscribe((res: any) => {
          this.countries = res; console.log(this.countries)},
        error => {alert("Unsuccessful fetch operation!"); console.log(error);}
      );
    }
    openAddDialog(){
      let dialogRef= this.dialog.open(DialogcountryComponent);
      dialogRef.componentInstance.title = "Adding new Country"
      dialogRef.afterClosed().subscribe( (result:Country) => {

        if(result == undefined || null){
          return;//case when you click outside the dialog
        }
        this.httpCountryService.postCountries(result).subscribe(
          ()=>{ 
            console.log('Country ' + result.Name + ' successfuly posted');
            this.ngOnInit();
          },
          error => {alert("Close!"); console.log(error);}
        );
      })
    }

    editCountry(country:Country){
      console.log("Start editing "+ country.Name);

      let dialogRef= this.dialog.open(DialogcountryComponent);
      dialogRef.componentInstance.title = "Editing Country"
      dialogRef.componentInstance.country = country;
      dialogRef.afterClosed().subscribe( (result:Country) => {

        if(result == undefined || null){
          return;//case when you click outside the dialog
        }

        result.Id = country.Id;
        this.httpCountryService.editCountry(result).subscribe(
          ()=>{ 
            console.log('Country ' + result.Name + ' successfuly edited');
            this.ngOnInit();
          },
          error => {alert("Close!"); console.log(error);}
        );
      })
    }
    deleteCountry(country:Country){

      console.log("Start deleting "+ country.Name);
      this.httpCountryService.deleteCountry(country).subscribe(
        ()=> {console.log('Country ' + country.Name + ' successfuly deleted');
              this.ngOnInit();},
        error => {alert("Unsuccessful deleting operation!"); console.log(error);}
        );
    }
}



