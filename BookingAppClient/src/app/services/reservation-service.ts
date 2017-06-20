import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { LocationService } from 'app/location.services';
import { ReservationPreview } from "app/models/reservation-preview";
import { Reservation } from "app/models/reservation";

@Injectable()
export class ReservationService {


    constructor(private http: Http, private locationService: LocationService) {

    }

    addReservation(reservation: Reservation) {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
        let opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        console.log(reservation);
        return this.http.post(
            this.locationService.RootLocation + 'reservation/reservation',
            reservation, opts);
    }

    getReservations() :Observable<any>{

        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
        let opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        return this.http.get(this.locationService.RootLocation + 'reservation/reservation_preview', opts).map(this.extractData);

    }

    deleteReservation(res_id) :Observable<any>{

        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
        let opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        
        return this.http.delete(this.locationService.RootLocation + 'reservation/reservation/'+res_id, opts).map(this.extractData);

    }

    private extractData(res: Response) {
        return res.json() || [];
    }


}


