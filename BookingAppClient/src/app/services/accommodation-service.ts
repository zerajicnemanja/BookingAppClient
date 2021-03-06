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
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.get(this.locationService.RootLocation + "accommodation/accommodations", opts).map(this.extractData);


    }

     getAccommodationForOwner(username:string): Observable<any> {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.get(this.locationService.RootLocation + "accommodation/acc_for_user/"+username, opts).map(this.extractData);
    }

    getAccommodation(id: number): Observable<any> {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.get(this.locationService.RootLocation + "accommodation/accomodations/" + id, opts).map(this.extractData);

    }


    addAccomodation(accomodation: Accommodation) {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.post(
            this.locationService.RootLocation + 'accommodation/accommodation',
            accomodation, opts);

    }

    deleteAccommodation(accommodation: Accommodation) {
        const headers: Headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;


        return this.http.delete(this.locationService.RootLocation + 'accommodation/accommodation/' + accommodation.Id, opts);

    }

    updateAccommodation(accomodation: Accommodation) {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        return this.http.put(
            this.locationService.RootLocation + 'accommodation/accommodation/' + accomodation.Id,
            accomodation, opts);

    }

    approveAccommodation(accomodation_id: number) {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        return this.http.put(
            this.locationService.RootLocation + 'accommodation/approve/' + accomodation_id, opts);

    }

    getImages(id:number): Observable<Response>{
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/octet-stream');
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.get(this.locationService.RootLocation + "accommodation/images/" + id, opts);
    }

    private extractData(res: Response) {
        return res.json() || [];
    }

}