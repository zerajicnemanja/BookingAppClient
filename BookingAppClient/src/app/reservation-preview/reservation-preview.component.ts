import { Component, OnInit } from '@angular/core';
import { ReservationPreview } from "app/models/reservation-preview";
import { ReservationService } from "app/services/reservation-service";

@Component({
  selector: 'app-reservation-preview',
  templateUrl: './reservation-preview.component.html',
  styleUrls: ['./reservation-preview.component.css']
})
export class ReservationPreviewComponent implements OnInit {

private reservations: Array<ReservationPreview>;


  constructor(private reservationService:ReservationService) { }

  ngOnInit() {
    this.reservationService.getReservations().subscribe((response:Array<ReservationPreview>)=>{
      this.reservations=response;
      console.log(this.reservations);    
    },
    error=>{
      console.log(error);
    });
  }

}
