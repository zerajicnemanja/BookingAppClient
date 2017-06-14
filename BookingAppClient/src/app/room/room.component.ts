import { Component, OnInit } from '@angular/core';
import { Room } from "app/models/room";
import { Accommodation } from "app/models/accommodation";
import { RoomService } from "app/services/room-service";
import { AccommodationService } from "app/services/accommodation-service";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  providers:[RoomService,AccommodationService]
})
export class RoomComponent implements OnInit {

  public room: Room;
  public accommodations: Array<Accommodation>;

  constructor(private roomService: RoomService,
    private accommodationService: AccommodationService) {
  }


  ngOnInit() {
    this.room = new Room();
    this.accommodationService.getAccommodations().subscribe((result: Array<Accommodation>) => {
      this.accommodations = result;
    });
  }

}
