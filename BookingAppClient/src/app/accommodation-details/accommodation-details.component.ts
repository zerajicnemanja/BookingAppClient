import { Component, OnInit } from '@angular/core';
import { Accommodation } from "app/models/accommodation";
import { ActivatedRoute, Router } from "@angular/router";
import { AccommodationService } from "app/services/accommodation-service";

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css'],
    providers:[AccommodationService]


})
export class AccommodationDetailsComponent implements OnInit {

  Id: number;
  public accommodation: Accommodation;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private accommodationService: AccommodationService) {

    activatedRoute.params.subscribe(params => {
      this.Id = params["Id"];
      this.ngOnInit();
    });


  }

  ngOnInit() {
    if (this.Id == undefined) {
      return;
    }

  this.accommodationService.getAccommodation(this.Id).subscribe((result:Accommodation)=>{
    this.accommodation=result;    
  });

  }

}
