import { Country } from './country.model';
import { Observable } from "rxjs/Observable";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import {Injectable} from '@angular/core'
import {LocationService} from "app/location.services"

@Injectable()
export class HttpCountryService {

    constructor(private http: Http,private locationService: LocationService) { 
    }

    getCountries(): Observable<any> {

        return this.http.get(this.locationService.RootLocation + "country/countries").map(this.extractData);        
    }
    private extractData(res: Response){
        return res.json() || [];
    }

    postCountries(country: Country): Observable<any> {

        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();

        opts.headers = headers;
        return this.http.post(
        this.locationService.RootLocation + 'country/country',
        country, opts);
    }

    deleteCountry(country:Country){
        return this.http.delete(this.locationService.RootLocation + 'country/country/'+ country.Id);
    }

    editCountry(country:Country){
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        
        return this.http.put(
            this.locationService.RootLocation + 'country/country/'+ country.Id,
            country,
            opts);
    }
}