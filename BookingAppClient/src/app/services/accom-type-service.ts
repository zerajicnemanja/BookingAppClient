import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Accommodation } from 'app/models/accommodation';
import { LocationService } from '../location.services';
import { AccommodationType } from '../models/accommodation-type';

@Injectable()
export class AccommodationTypeService {
    constructor(private http: Http, private locationService: LocationService) { }

    getAccTypes(): Observable<any> {
        const headers: Headers = new Headers();        
        headers.append('Authorization','Bearer '+localStorage.getItem('id_token'));
        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.get(this.locationService.RootLocation + "type/types",opts).map(this.extractData);
    }
     private extractData(res: Response) {
        return res.json() || [];
    }

    postType(accType:AccommodationType){
        const headers: Headers = new Headers();        
        headers.append('Authorization','Bearer '+localStorage.getItem('id_token'));
        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.post(this.locationService.RootLocation+ 'type/type', accType, opts);
    }

    delete(accType:AccommodationType){
        const headers: Headers = new Headers();        
        headers.append('Authorization','Bearer '+ localStorage.getItem('id_token'));
        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.delete(this.locationService.RootLocation+ 'type/type/'+ accType.Id, opts);
    }
}