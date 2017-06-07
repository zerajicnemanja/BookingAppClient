import { Component, OnInit } from '@angular/core';
import {Country} from "./country.model"
import { Observable } from "rxjs/Observable";
import { Http, Response } from '@angular/http';
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  private countries: any;

        constructor(private http: Http) { 
        }
  getCountries(): Observable<any> {

        return this.http.get("http://localhost:54042/country/countries");        
    }
  ngOnInit() {

      this.getCountries().subscribe((res: Response) => {this.countries = res.json(); console.log(this.countries)})
  }

  

}
