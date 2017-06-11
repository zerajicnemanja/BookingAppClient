import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { } from 'app/accomodation/accomodation.component'

@Component({
  selector: 'app-accomodation',
  templateUrl: './accomodation.component.html',
  styleUrls: ['./accomodation.component.css']
})
export class AccomodationComponent implements OnInit {
  private list_types: any[];
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


  }

  update() {
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
}
