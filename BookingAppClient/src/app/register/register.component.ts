import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'app/services/register.service'
import { FormsModule, NgForm } from '@angular/forms';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {

  };

  constructor(
    private registerService: RegisterService,
    public dialogRef: MdDialogRef<RegisterComponent>) { }

  ngOnInit() {
  }

  registerUser(user: any, form: NgForm) {
    debugger
    this.registerService.registerUser(user).subscribe(
      data => {
        this.dialogRef.close("success");
        alert('ok');
      },
      error => { alert(error); console.log(error); })
  }

  switchToSignIn() {
    this.dialogRef.close("toSignIn");
  }

}

