import { Component, OnInit } from '@angular/core';
import { Accommodation } from "app/models/accommodation";
import { ActivatedRoute, Router } from "@angular/router";
import { AccommodationService } from "app/services/accommodation-service";
import { Room } from "app/models/room";
import { RoomService } from "app/services/room-service";
import { NgForm } from "@angular/forms/src/forms";
import { DatepickerModule } from 'angular2-material-datepicker';
import { MdDialog } from "@angular/material";
import { ReservationDialogComponent } from "app/reservation-dialog/reservation-dialog.component";
import { Reservation } from "app/models/reservation";
import { ReservationService } from "app/services/reservation-service";

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css'],
  providers: [AccommodationService, RoomService,ReservationService]


})
export class AccommodationDetailsComponent implements OnInit {

  Id: number;
  public accommodation: Accommodation;
  private permitEdit: boolean = false;
  private permitDelete: boolean = false;
  private permitAdd: boolean = false;
  private permitReserve: boolean = false;
  private edit = false;
  private rooms: Array<Room>;
  public room: Room;

  constructor(
    private router: Router,
    public dialog: MdDialog,
    private activatedRoute: ActivatedRoute,
    private reservationService: ReservationService,
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
      this.permitAdd = true;
      this.permitDelete = true;
      this.permitEdit = true;

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
    this.roomService.deleteRoom(room).subscribe(() => {
      console.log(`romm${room.RoomNumber} deleted`);
    },
      error => {
        console.log(error);
      });
    this.ngOnInit();
  }

  editRoom(editingRoom: Room) {
    this.edit = true;
    this.room = editingRoom;
  }


  reserveRoom(reservationRoom: Room) {
    let dialogRef = this.dialog.open(ReservationDialogComponent, {
      height: '400px',
      width: '600px',
    });
    dialogRef.componentInstance.title = "New reservation";
    dialogRef.afterClosed().subscribe((result: Reservation) => {
      result.Room_Id=reservationRoom.Id;
      console.log(result);
      this.reservationService.addReservation(result).subscribe(() => {
        console.log('Ok')
      },
        error => {
          console.log(error);
        });

    },
      error => {

      });
  }

  onSubmit(room: Room, form: NgForm) {
    room.Accomodation_Id = this.room.Accomodation_Id;
    room.Id = this.room.Id;
    if (this.edit = true) {
      this.roomService.updateRoom(room).subscribe(() =>
      { console.log("OK") },
        error => {
          console.log(error);
        });
    } else {
      this.roomService.addRoom(room);
    }
    form.reset();
    this.ngOnInit();
  }

}
