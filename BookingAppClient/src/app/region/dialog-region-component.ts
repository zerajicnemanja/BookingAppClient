import { Component, OnInit} from '@angular/core';
import { Region } from './region.model';
import { Country } from '../country/country.model';
import { MdDialog,MdDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';
import { HttpCountryService} from 'app/country/country.http.service'
@Component({
  selector: 'dialog-region-component',
  templateUrl: './dialog-region-component.html',
  providers: [HttpCountryService]
})

export class DialogRegionComponent{
  public title: string;
  public selectedRegion: Region
  public countries: Array<Country>;
  constructor(public dialogRef: MdDialogRef<DialogRegionComponent>, 
  public httpCountryService:HttpCountryService) {}

  ngOnInit() {
      if(this.selectedRegion == undefined){
        this.selectedRegion = new Region();
      }

      this.httpCountryService.getCountries().subscribe((res: any) => {
        this.countries = res; console.log(this.countries);
        this.selectedRegion.Country=this.countries.find( 
          x => x.Id == this.selectedRegion.Country_Id);

        },
        error => {alert("Unsuccessful fetch operation!"); console.log(error);}
      );
    }
  onSubmit(region: Region, form: NgForm) {
    
      let rer = this.selectedRegion;
      if(!form.valid){
        return;
      }
      region.Country_Id = region.Country.Id;
      region.Country = null;
      form.reset();
      this.dialogRef.close(region);
    }
}