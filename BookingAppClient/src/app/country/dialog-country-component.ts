import { Component, OnInit } from '@angular/core';
import { Country } from '../country/country.model';
import { MdDialog, MdDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'dialog-country-component',
  templateUrl: './dialog-country-component.html'
})
export class DialogCountryComponent {
  public title: string;
  public country: Country;
  constructor(public dialogRef: MdDialogRef<DialogCountryComponent>) { }

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