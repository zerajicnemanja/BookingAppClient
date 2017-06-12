import { Component, OnInit} from '@angular/core';
import { Place } from './place.model';
import { Country } from '../country/country.model';
import { MdDialog,MdDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Region } from '../region/region.model';
import { HttpRegionService } from '../region/region.http.service';
@Component({
  selector: 'dialog-place-component',
  templateUrl: './dialog-place-component.html',
  providers: [HttpRegionService]
})

export class DialogPlaceComponent{
  public title: string;
  public selectedPlace: Place
  public regions: Array<Region>;
  constructor(public dialogRef: MdDialogRef<DialogPlaceComponent>, 
  public httpRegionService:HttpRegionService) {}

  ngOnInit() {
      if(this.selectedPlace == undefined){
        this.selectedPlace = new Place();
      }

      this.httpRegionService.getRegions().subscribe((res: any) => {
        this.regions = res; console.log(this.regions);
        this.selectedPlace.Region=this.regions.find( 
          x => x.Id == this.selectedPlace.Region_Id);
        },
        error => {alert("Unsuccessful fetch operation!"); console.log(error);}
      );
    }
  onSubmit(place: Place, form: NgForm) {
    
      let rer = this.selectedPlace;
      if(!form.valid){
        return;
      }
      place.Region_Id = place.Region.Id;
      place.Region = null;
      form.reset();
      this.dialogRef.close(place);
    }
}