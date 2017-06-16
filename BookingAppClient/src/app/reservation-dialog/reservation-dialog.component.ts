import { Component, OnInit } from '@angular/core';
import {CalendarModule} from 'primeng/primeng';
import { MdDialogRef } from "@angular/material";
import { Reservation } from "app/models/reservation";
import { NgForm } from "@angular/forms/src/forms";

@Component({
  selector: 'app-reservation-dialog',
  templateUrl: './reservation-dialog.component.html',
  styleUrls: ['./reservation-dialog.component.css']
})
export class ReservationDialogComponent implements OnInit {

public title:string;

public reservation:Reservation;


  constructor( public dialogRef:MdDialogRef<ReservationDialogComponent>
              ) { 
                  this.reservation=new Reservation();
              }

  ngOnInit() {

  }

   onSubmit(form:NgForm) {

        if (!form.valid) {
            return;
        }
        form.reset();

        this.dialogRef.close(this.reservation);
    }

}
