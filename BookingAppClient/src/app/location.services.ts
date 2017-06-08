import {Injectable} from '@angular/core'

@Injectable()
export class LocationService{

    public RootLocation: string

    constructor(){
        this.RootLocation = "http://localhost:54042/";
    }
}