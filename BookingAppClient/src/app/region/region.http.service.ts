import { Region } from './region.model';
import { Observable } from "rxjs/Observable";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import {Injectable} from '@angular/core'
import {LocationService} from "app/location.services"

@Injectable()
export class HttpRegionService {

    constructor(private http: Http,private locationService: LocationService) { 
    }

    getRegions(): Observable<any> {

        return this.http.get(this.locationService.RootLocation + "region/regions").map(this.extractData);        
    }
    private extractData(res: Response){
        return res.json() || [];
    }

    postRegion(region: Region): Observable<any> {

        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();

        opts.headers = headers;
        return this.http.post(
        this.locationService.RootLocation + 'region/region',
        region, opts);
    }

    deleteRegion(region:Region){
        return this.http.delete(this.locationService.RootLocation + 'region/region/'+ region.Id);
    }

    editRegion(region:Region){
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        
        return this.http.put(
            this.locationService.RootLocation + 'region/region/'+ region.Id,
            region,
            opts);
    }
}