import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class RegisterService {
    constructor(private http: Http) { }

    registerUser( model:any):Observable<any> {
        let headers = new Headers();
       headers.append('Content-Type', 'application/x-www-form-urlencoded'); 

  
      return this.http.post('http://localhost:54042/api/Account/Register',
         `Username=${model.Username}&Password=${model.Password}&ConfirmPassword=${model.ConfirmPassword}&Email=${model.Email}`,
         {headers:headers});
                    
    }

    
}