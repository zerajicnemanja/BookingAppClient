import { Component, OnInit } from '@angular/core';
import {RegisterService} from 'app/services/register.service'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

   model: any = {};

    constructor(      
        private registerService: RegisterService ) { }

  ngOnInit() {
  }

  registerUser(){
    var regResult =this.registerService.registerUser(this.model);
  }

}

