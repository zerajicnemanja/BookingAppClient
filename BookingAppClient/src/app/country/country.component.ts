import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Country } from "./country.model"
import { Observable } from "rxjs/Observable";
import { HttpCountryService } from './country.http.service';
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  providers: [HttpCountryService]
})
export class CountryComponent implements OnInit {

  private countries: Array<Country>;
  private asda: any;
  isVisible = true;
  

        constructor(private httpCountryService: HttpCountryService) { 
        }
 
    ngOnInit() {
      this.httpCountryService.getCountries().subscribe((res: any) => {this.countries = res; console.log(this.countries)},
                                    error => {alert("Unsuccessful fetch operation!"); console.log(error);}
      );
    }

    onSubmit(country: Country, form: NgForm) {
      console.log(country);
      this.countries.push(country);
      this.asda = this.httpCountryService.postCountries(country).subscribe(
        ()=> console.log('Country ' + country.Name + ' successfuly posted'),
        error => {alert("Unsuccessful fetch operation!"); console.log(error);}
        );

      form.reset();
    }

    toggle(){
      this.isVisible = !this.isVisible;
    }
  

}
