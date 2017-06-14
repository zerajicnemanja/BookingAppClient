import { Component, OnInit, Injectable } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Country } from '../country/country.model';
import { NgForm } from '@angular/forms';
import { HttpCountryService } from 'app/country/country.http.service';

@Component({
  selector: 'app-dialogcountry',
  templateUrl: './dialogcountry.component.html',
  styleUrls: ['./dialogcountry.component.css'],
  providers: [HttpCountryService]
})
@Injectable()
export class DialogcountryComponent implements OnInit {

  public title: string;
  public country: Country;
  public errorMessage: string;
  public isEditing: boolean;
  constructor(public dialogRef: MdDialogRef<DialogcountryComponent>, public httpCountryService: HttpCountryService) { }

  ngOnInit() {
    if (this.country == undefined) {
      this.country = new Country();
    }
  }
  onSubmit(country: Country, form: NgForm) {
    console.log(country);

    if (!form.valid) {
      return;
    }


    if (this.isEditing) {
        country.Id = this.country.Id;
        this.httpCountryService.editCountry(country).subscribe(
        () => {
          console.log('Country ' + country.Name + ' successfuly edited');
          this.dialogRef.close(country);
        },
        (error:any) => {
          this.errorMessage = error.json().Message;
          console.log(error);
        }
      );
    } else {
      this.httpCountryService.postCountries(country).subscribe(
        () => {
          console.log('Country ' + country.Name + ' successfuly posted');
          this.dialogRef.close(country);
        },
        
        (error:any) => {
          this.errorMessage = error.json().Message;
          console.log(error);
        }
      );
    }

  }
}
