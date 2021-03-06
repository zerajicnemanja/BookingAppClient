import { Component, OnInit } from '@angular/core';
import { Place } from './place.model';
import { Country } from '../country/country.model';
import { MdDialog, MdDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Region } from '../region/region.model';
import { HttpRegionService } from '../region/region.http.service';
import { HttpPlaceService } from './place.http.service';
@Component({
  selector: 'dialog-place-component',
  templateUrl: './dialog-place-component.html',
  providers: [HttpRegionService, HttpPlaceService]
})

export class DialogPlaceComponent {
  public title: string;
  public isEditing: boolean;
  public errorMessage: string;
  public selectedPlace: Place;
  public regions: Array<Region>;

  constructor(
    public dialogRef: MdDialogRef<DialogPlaceComponent>,
    public httpRegionService: HttpRegionService,
    public httpPlaceService: HttpPlaceService
  ) { }

  ngOnInit() {
    if (this.selectedPlace == undefined) {
      this.selectedPlace = new Place();
    }

    this.httpRegionService.getRegions().subscribe((res: any) => {
      this.regions = res; console.log(this.regions);
      this.selectedPlace.Region = this.regions.find(
        x => x.Id == this.selectedPlace.Region_Id);
    },
      error => { alert("Unsuccessful fetch operation!"); console.log(error); }
    );
  }
  onSubmit(place: Place, form: NgForm) {

    let rer = this.selectedPlace;
    if (!form.valid) {
      return;
    }
    place.Region_Id = place.Region.Id;

    if (this.isEditing) {
      place.Id = this.selectedPlace.Id;
      this.httpPlaceService.editPlace(place).subscribe(
        () => {
          console.log('Place ' + place.Name + ' successfuly edited');
          this.dialogRef.close(place);

        },
        (error: any) => {
          this.errorMessage = error.json().Message;
          console.log(error);
        }
      );
    } else {
      this.httpPlaceService.postPlace(place).subscribe(
        () => {
          console.log('Place ' + place.Name + ' successfuly posted');
          this.dialogRef.close(place);
        },
        (error: any) => {
          this.errorMessage = error.json().Message;
          console.log(error);
        }
      );
    }

  }
  
}