import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class RegisterService {
    constructor(private http: Http) { }

    registerUser( model:any) {
        let headers = new Headers();
       headers.append('Content-Type', 'application/x-www-form-urlencoded'); 

  
      this.http.post('http://localhost:54042/api/Account/Register',
         `Username=${model.username}&Password=${model.password}&ConfirmPassword=${model.confirmPassword}&Email=${model.email}`,
         {headers:headers}).subscribe(data => { alert('ok');}, error => {console.log(error.json());});
                    
    }

    
}