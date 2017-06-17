import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Accommodation } from 'app/models/accommodation';
import { LocationService } from '../location.services';

@Injectable()
export class FilterService {
    constructor(private http: Http, private locationService: LocationService) { }

    filterAccommodation(query:string): Observable<any> {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
console.log(this.locationService.RootLocation + query);
        return this.http.get(this.locationService.RootLocation + query, opts).map(this.extractData);


    }

     private extractData(res: Response) {
        return res.json().value;
    }
}