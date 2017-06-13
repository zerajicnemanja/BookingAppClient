import { Component, OnInit, Injectable } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Country } from '../country/country.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dialogcountry',
  templateUrl: './dialogcountry.component.html',
  styleUrls: ['./dialogcountry.component.css']
})
@Injectable()
export class DialogcountryComponent implements OnInit {

  public title: string;
  public country: Country;
  constructor(public dialogRef: MdDialogRef<DialogcountryComponent>) { }

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

    form.reset();
    this.dialogRef.close(country);
  }
}
