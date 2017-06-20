import { Component, OnInit } from '@angular/core';
import { User } from "app/models/user";
import { UserService } from "app/services/user.service";

@Component({
  selector: 'app-user-control',
  templateUrl: './user-control.component.html',
  styleUrls: ['./user-control.component.css']
})
export class UserControlComponent implements OnInit {
public users:Array<User>;

  constructor(private userService :UserService) { }

  ngOnInit() {
    this.loadUsers();
  }

loadUsers(){
  this.userService.getUsers().subscribe(
    (response:Array<User>)=>{
        this.users=response;
        console.log(response);
    },
    error=>{
      console.log(error);
    }
  );
}

  approveUser(user :User){
    this.userService.approveUser(user).subscribe(()=>{
      console.log("OK");
    },
    error=>{
      console.log(error);
  
    });


    
  }

}
