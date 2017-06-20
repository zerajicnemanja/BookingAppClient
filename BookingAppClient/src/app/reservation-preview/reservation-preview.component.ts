import { Component, OnInit } from '@angular/core';
import { ReservationPreview } from "app/models/reservation-preview";
import { ReservationService } from "app/services/reservation-service";
import { Reservation } from 'app/models/reservation';

@Component({
  selector: 'app-reservation-preview',
  templateUrl: './reservation-preview.component.html',
  styleUrls: ['./reservation-preview.component.css'],
  providers: [ReservationService]
})
export class ReservationPreviewComponent implements OnInit {

public  reservations: Array<ReservationPreview>;

  role:string;
  constructor(private reservationService:ReservationService) { }

  ngOnInit() {
    this.role = localStorage.getItem('role');
    this.reservationService.getReservations().subscribe((response:Array<ReservationPreview>)=>{
      this.reservations=response;
      console.log(this.reservations);    
    },
    error=>{
      console.log(error);
    });
  }

  cancel(reservation:ReservationPreview){
    this.reservationService.deleteReservation(reservation.Id).subscribe(
      ()=>{
        console.log("Reservation successfully canceled");
        this.ngOnInit();
      },
      error=>{
        console.error(error);
      }
    )
  }
}
