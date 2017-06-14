import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Accommodation } from 'app/models/accommodation';
import { Place } from '../models/place';
import { AccommodationType } from '../models/accommodation-type';
import { HttpPlaceService } from '../place/place.http.service';
import { AccommodationTypeService } from '../services/accom-type-service';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app-accommodation-dialog',
  templateUrl: './accommodation-dialog.component.html',
  styleUrls: ['./accommodation-dialog.component.css'],
  providers:[HttpPlaceService,AccommodationTypeService]
})
export class AccommodationDialogComponent implements OnInit {

public title:string;
public accommodation:Accommodation;
public places:Array<Place>;
public types:Array<AccommodationType>;
public accomodationType:AccommodationType;
public place:Place;


  constructor(public dialogRef:MdDialogRef<AccommodationDialogComponent>,
  private  placeService:HttpPlaceService,
  private accomTypeService: AccommodationTypeService) { 
   let  place=new Place();
   let accomodationType=new AccommodationType();

  }


  ngOnInit() {
    if(this.accommodation==undefined){
      this.accommodation=new Accommodation();
    }
    this.placeService.getPlaces().subscribe((result:Array<Place>)=>
    {
      this.places=result;
    });
    
    this.accomTypeService.getAccommodations().subscribe((result:Array<AccommodationType>)=>{
      this.types=result;
    }
    );
  }

  onSubmit(accommodation:Accommodation,form:NgForm){
    console.log(accommodation);
    if(!form.valid){
      return;
    }
    form.reset();
    
    this.dialogRef.close(accommodation);
  }

}
