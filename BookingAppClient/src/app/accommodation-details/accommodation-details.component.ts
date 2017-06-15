import { Component, OnInit } from '@angular/core';
import { Accommodation } from "app/models/accommodation";
import { ActivatedRoute, Router } from "@angular/router";
import { AccommodationService } from "app/services/accommodation-service";
import { Room } from "app/models/room";
import { RoomService } from "app/services/room-service";
import { NgForm } from "@angular/forms/src/forms";

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css'],
  providers: [AccommodationService, RoomService]


})
export class AccommodationDetailsComponent implements OnInit {

  Id: number;
  public accommodation: Accommodation;
  private permitEdit: boolean = false;
  private permitDelete: boolean = false;
  private permitAdd: boolean = false;
  private permitReserve: boolean = false;
  private rooms: Array<Room>;
  public room: Room;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private accommodationService: AccommodationService,
    private roomService: RoomService) {
      this.room = new Room();
    activatedRoute.params.subscribe(params => {
      this.Id = params["Id"];
      this.ngOnInit();
    });


  }

  ngOnInit() {
    if (this.Id == undefined) {
      return;
    }

    this.accommodationService.getAccommodation(this.Id).subscribe((result: Accommodation) => {
      this.accommodation = result;
      this.getRooms();
      this.resetPermitions();
      this.getPermitions();
    });


  }

  getRooms() {
    this.roomService.getCustomRooms(this.accommodation.Id).subscribe((result: Array<Room>) => {
      this.rooms = result;
    });

  }

  getPermitions() {
    let role = localStorage.getItem("role");
    if (role == "Admin") {
      this.permitDelete = true;

    } else if (role == "Manager") {
      this.permitAdd = true;
      this.permitDelete = true;
      this.permitEdit = true;

    } else if (role == "User") {
      this.permitReserve = true;
    }
  }
  resetPermitions() {
    this.permitAdd = false;
    this.permitDelete = false;
    this.permitEdit = false;
    this.permitReserve = false;

  }

  deleteRoom(room: Room) {

  }

  editRoom(room: Room) {

  }
  reserveRoom(room: Room) {

  }

  onSubmit(room: Room, form: NgForm) {
    room.Accomodation_Id = this.room.Accomodation_Id;

  }

}
