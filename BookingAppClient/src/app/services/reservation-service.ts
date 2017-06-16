import { Injectable } from '@angular/core';
import { Http,Headers, RequestOptions } from "@angular/http";
import { Reservation } from "app/models/reservation";
import { LocationService } from "app/location.services";

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

}


