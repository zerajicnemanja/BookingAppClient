import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Room } from 'app/models/room';

@Injectable()
export class RoomService {
    constructor(private http: Http) { }


    addRoom(room: Room) {
        const headers: Headers = new Headers();        
        headers.append('Authorization','Bearer '+localStorage.getItem('id_token'));
        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;


    }

    deleteRoom(room: Room) {
        const headers: Headers = new Headers();        
        headers.append('Authorization','Bearer '+localStorage.getItem('id_token'));
        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

    }

    updateRoom(room: Room) {
        const headers: Headers = new Headers();        
        headers.append('Authorization','Bearer '+localStorage.getItem('id_token'));
        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

    }

}