import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-accomodation-type',
  templateUrl: './accomodation-type.component.html',
  styleUrls: ['./accomodation-type.component.css']
})
export class AccomodationTypeComponent implements OnInit {
    model: any = {};

  constructor(private http:Http) { }

  ngOnInit() {
  }

  save(){
       let headers = new Headers();
       headers.append('Content-Type', 'application/x-www-form-urlencoded'); 

       this.http.post('http://localhost:54042/api/AccommodationType/AddType', `Name=${this.model.type}`,    {headers:headers})
       .subscribe(
        response => {
         alert("OK");
        },
        error => {
         // alert(error.text());
          console.log(error.text());
        }
      );

  }

}
