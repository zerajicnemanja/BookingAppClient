import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Room } from 'app/models/accommodation';

@Injectable()
export class RoomService {
    constructor(private http: Http) { }


addRoom(accomodation :Room){



}

deleteRoom(accommodation :Room){


}

updateRoom(accomodation:Room){
    

}

}