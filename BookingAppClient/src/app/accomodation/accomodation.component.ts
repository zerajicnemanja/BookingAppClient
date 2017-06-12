import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-accomodation',
  templateUrl: './accomodation.component.html',
  styleUrls: ['./accomodation.component.css']
})
export class AccomodationComponent implements OnInit {
  private list_types: any[];
  private list_places:string[] =['BiH','Slovenija'];

  model: any = {};

  constructor(private http: Http) { }

  ngOnInit() {
    this.http.post('http://localhost:54042/api/AccommodationType/GetTypes', '')
      .subscribe(
      response => {
        this.list_types = response.json().TypeNames;
     //   alert("OK");
      },
      error => {
        alert(error.text());
        console.log(error.text());
      }
      );
  }

  save() {
    this.model.username=localStorage.getItem('username');

     let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded'); 

       this.http.post('http://localhost:54042/api/Accommodation/AddAccommodation', 
       `Name=${this.model.name}
       &Description=${this.model.escription}
       &Address=${this.model.address}
       &Latitude=${this.model.latitude}
       &Longitude=${this.model.longitude}
       &Username=${this.model.username}
       &PlaceName=${this.model.PlaceName}`,
       {headers:headers})
       .subscribe(
        response => {
          alert('svaka cas');
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );


  }

  loadTypes() {
    this.http.post('http://localhost:54042/api/AccommodationType/GetTypes', '')
      .subscribe(
      response => {
        this.list_types = response.json().TypeNames;
      },
      error => {
        alert(error.text());
        console.log(error.text());
      }
      );


  }

  loadPlaces(){


  }
}
