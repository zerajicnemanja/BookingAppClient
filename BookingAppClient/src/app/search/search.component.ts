
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Filter } from "app/models/filter";
import { NgForm } from "@angular/forms/src/forms";
import { FilterService } from "app/services/filter-service";
import { Accommodation } from "app/models/accommodation";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [FilterService]
})
export class SearchComponent implements OnInit {
  public filter: Filter;
  public query: string;
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  accommodations: Array<Accommodation>;

  constructor(private filterService: FilterService) {
  }

  ngOnInit() {
    this.filter = new Filter();
    this.filter.MinPrice = 0;
    this.filter.MaxPrice = 10000;
    this.filter.MinRate = 1;
    this.filter.MaxRate = 5;
  }
  onSubmit(searchform: NgForm) {

    //http://localhost:54042/odata/AccomodationsQuery?$filter=Rooms/any(tag:tag/BedCount eq 4) 
//and Rooms/any(r:r/PricePerNight lt 1000 and r/PricePerNight gt 1) and AverageGrade gt 1 and AverageGrade lt 10 and Place/Name eq 'Gacko' and Name eq 'Klinje'
    this.query = `odata/AccomodationsQuery?$filter=Rooms/any(tag:tag/BedCount eq ${this.filter.BedCount})
  and Rooms/any(r:r/PricePerNight lt ${this.filter.MaxPrice} and r/PricePerNight gt ${this.filter.MinPrice}) and AverageGrade gt ${this.filter.MinRate} 
  and AverageGrade lt ${this.filter.MaxPrice} and Place/Name eq '${this.filter.Place}' `;

    this.filterService.filterAccommodation(this.query).subscribe((result: Array<Accommodation>) => {
      this.accommodations = result;
      console.log(this.accommodations);
      console.log('filter :');
      console.log(this.filter);
      this.notify.emit(this.accommodations);
    },
      error => {
        console.log(error);
      });
  }
}
