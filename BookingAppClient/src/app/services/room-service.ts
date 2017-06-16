import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Room } from 'app/models/room';
import { LocationService } from "app/location.services";

@Injectable()
export class RoomService {
    constructor(private http: Http,private locationService:LocationService) { }



    getRooms():Observable<any>{
        const headers: Headers = new Headers();        
        headers.append('Authorization','Bearer '+localStorage.getItem('id_token'));
        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

                return this.http.get(this.locationService.RootLocation + "room/rooms",opts).map(this.extractData);


    }
    addRoom(room: Room) {
        const headers: Headers = new Headers();        
        headers.append('Authorization','Bearer '+localStorage.getItem('id_token'));
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.post(
           this.locationService.RootLocation + "room/room",
            room, opts);

    }

    deleteRoom(room: Room) {
        const headers: Headers = new Headers();        
        headers.append('Authorization','Bearer '+localStorage.getItem('id_token'));
        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        return this.http.delete(this.locationService.RootLocation + "room/room" + room.Id,opts);

    }

    updateRoom(room: Room) {
        const headers: Headers = new Headers();        
        headers.append('Content-type', 'application/json');
        headers.append('Authorization','Bearer '+localStorage.getItem('id_token'));
        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
let path=this.locationService.RootLocation + 'room/room/'+room.Id;
let a=1;
         return this.http.put(
            this.locationService.RootLocation + 'room/room/'+room.Id,
            room, opts);

    }

    getCustomRooms(accomodationId:number):Observable<any>{
        const headers: Headers = new Headers();        
        headers.append('Authorization','Bearer '+localStorage.getItem('id_token'));
        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

                return this.http.get(this.locationService.RootLocation + "room/customrooms/"+accomodationId,opts).map(this.extractData);


    }

    private extractData(res: Response) {
        return res.json() || [];
    }

}