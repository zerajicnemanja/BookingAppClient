import { Component, OnInit } from '@angular/core';
import { CalendarModule } from 'primeng/primeng';
import { MdDialogRef } from "@angular/material";
import { Reservation } from "app/models/reservation";
import { NgForm } from "@angular/forms/src/forms";
import { ReservationService } from 'app/services/reservation-service';

@Component({
    selector: 'app-reservation-dialog',
    templateUrl: './reservation-dialog.component.html',
    styleUrls: ['./reservation-dialog.component.css'],
    providers: [ReservationService]
})
export class ReservationDialogComponent implements OnInit {

    public title: string;

    public reservation: Reservation;
    public errorMessage: string;
    public room_id: number;

    constructor(public dialogRef: MdDialogRef<ReservationDialogComponent>,
        private reservationService: ReservationService
    ) {
        this.reservation = new Reservation();
    }

    ngOnInit() {

    }

    onSubmit(form: NgForm) {

        if (!form.valid) {
            return;
        }

        if (this.reservation.EndTime < this.reservation.StartTime) {
            this.errorMessage = "End time cant be before start time";
            return
        }
        this.reservation.Room_Id = this.room_id;
        this.reservationService.addReservation(this.reservation).subscribe(
            () => {
                console.log('Reservation successfuly posted');
                this.dialogRef.close();
            },

            (error: any) => {
                this.errorMessage = error.json();
                debugger;
                console.log(error);
            });
        form.reset();
    }

}
