import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { LocationService } from 'app/location.services';

@Injectable()
export class CommentService {
    constructor(private http: Http, private locationService: LocationService) { }

    getCommentForAccs(id: number): Observable<any> {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        return this.http.get(this.locationService.RootLocation + "comment/comment/acc/" + id, opts).map(this.extractData);
    }

    private extractData(res: Response) {
        return res.json() || [];
    }
}