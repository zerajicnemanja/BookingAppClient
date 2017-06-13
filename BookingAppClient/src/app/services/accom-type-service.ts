import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Accommodation } from 'app/models/accommodation';
import { LocationService } from '../location.services';

@Injectable()
export class AccommodationTypeService {
    constructor(private http: Http, private locationService: LocationService) { }

    getAccommodations(): Observable<any> {
        return this.http.get(this.locationService.RootLocation + "type/types").map(this.extractData);
    }
     private extractData(res: Response) {
        return res.json() || [];
    }
}