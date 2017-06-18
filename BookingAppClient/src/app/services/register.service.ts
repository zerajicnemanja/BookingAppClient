import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { LocationService } from 'app/location.services';

@Injectable()
export class RegisterService {
    constructor(private http: Http, public locationService:LocationService) { }

    registerUser( model:any):Observable<any> {
        let headers = new Headers();
       headers.append('Content-Type', 'application/x-www-form-urlencoded'); 

  
      return this.http.post(this.locationService.RootLocation +'api/Account/Register',
         `Username=${model.Username}&Password=${model.Password}&ConfirmPassword=${model.ConfirmPassword}&Email=${model.Email}&Role=${model.Role}`,
         {headers:headers});
                    
    }

    
}