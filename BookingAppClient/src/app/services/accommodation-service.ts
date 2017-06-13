import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Accommodation } from 'app/models/accommodation';
import { LocationService } from '../location.services';

@Injectable()
export class AccommodationService {
    constructor(private http: Http, private locationService: LocationService) { }

    getAccommodations(): Observable<any> {

        return this.http.get(this.locationService.RootLocation + "place/places").map(this.extractData);


    }
    addAccomodation(accomodation: Accommodation) {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        const opts: RequestOptions = new RequestOptions();

        opts.headers = headers;
        return this.http.post(
            this.locationService.RootLocation + 'accommodation/accommodation',
            accomodation, opts);

    }

    deleteAccommodation(accommodation: Accommodation) {

        return this.http.delete(this.locationService.RootLocation + 'accommodation/accommodation/' + accommodation.Id);

    }

    updateAccommodation(accomodation: Accommodation) {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        return this.locationService.RootLocation + 'acco'

    }

    private extractData(res: Response) {
        return res.json() || [];
    }

}