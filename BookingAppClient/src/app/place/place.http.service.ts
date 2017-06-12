import { Place } from './place.model';
import { Observable } from "rxjs/Observable";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import {Injectable} from '@angular/core'
import {LocationService} from "app/location.services"

@Injectable()
export class HttpPlaceService {

    constructor(private http: Http,private locationService: LocationService) { 
    }

    getPlaces(): Observable<any> {

        return this.http.get(this.locationService.RootLocation + "place/places").map(this.extractData);        
    }
    private extractData(res: Response){
        return res.json() || [];
    }

    postPlace(place: Place): Observable<any> {

        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();

        opts.headers = headers;
        return this.http.post(
        this.locationService.RootLocation + 'place/place',
        place, opts);
    }

    deletePlace(place:Place){
        return this.http.delete(this.locationService.RootLocation + 'place/place/'+ place.Id);
    }

    editPlace(place:Place){
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        
        return this.http.put(
            this.locationService.RootLocation + 'place/place/'+ place.Id,
            place,
            opts);
    }
}