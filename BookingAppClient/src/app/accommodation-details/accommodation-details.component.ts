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
import { LocationService } from '../location.services';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { MenuItem } from "primeng/primeng";
import { ReservationPreviewComponent } from 'app/reservation-preview/reservation-preview.component';
@Component({
    selector: 'app-accommodation-details',
    templateUrl: './accommodation-details.component.html',
    styleUrls: ['./accommodation-details.component.css'],
    providers: [AccommodationService, RoomService, ReservationService]


})
export class AccommodationDetailsComponent implements OnInit {

    public images: Array<any> = [{ source: "assets/noimagefound.jpg" }];
    public uploader: FileUploader;
    Id: number;
    public accommodation: Accommodation = new Accommodation();
    private permitEdit: boolean = false;
    private permitDelete: boolean = false;
    private permitAdd: boolean = false;
    private permitReserve: boolean = false;
    private edit = false;
    private rooms: Array<Room>;
    public room: Room;
    public uploadUrl: string;
    public roomTemplate: Array<Room> = [new Room()];
    public selectedRoom: Room;
    public mapLatitude: number;
    public mapLongitude: number;
    public role: string;
    menuItems: MenuItem[];
    msgs: any[];

    uploadedFiles: any[] = [];

    constructor(
        private router: Router,
        public dialog: MdDialog,
        private activatedRoute: ActivatedRoute,
        private reservationService: ReservationService,
        private accommodationService: AccommodationService,
        private roomService: RoomService,
        private locationService: LocationService) {
        this.room = new Room();
        activatedRoute.params.subscribe(params => {
            this.Id = params["Id"];
            this.ngOnInit();
        });
        this.uploader = new FileUploader("");
    }

    ngOnInit() {

        if (this.Id == undefined) {
            return;
        }
        this.role = localStorage.getItem("role");

        this.menuItems = [
            { label: 'Reserve', icon: 'fa-calendar-check-o', command: (event) => this.reserveRoom(this.selectedRoom) },
            { label: 'Edit', icon: 'fa-pencil', command: (event) => this.editRoom(this.selectedRoom) },
            { label: 'Delete', icon: 'fa-trash', command: (event) => this.deleteRoom(this.selectedRoom) }
        ];

        this.accommodationService.getAccommodation(this.Id).subscribe((result: Accommodation) => {

            this.mapLatitude = result.Latitude + 0.69;
            this.mapLongitude = result.Longitude - 1.5;
            this.accommodation = result;
            this.getRooms();
            this.resetPermitions();
            this.getPermitions();
            this.getImages();
            this.uploader = new FileUploader({ url: this.locationService.RootLocation + "accommodation/image/upload/" + this.accommodation.Id });
        });

    }

    getImages() {

        this.accommodationService.getImages(this.accommodation.Id).subscribe(
            (result: any) => {
                result = result.json();
                if (result == undefined || result == null) {
                    return;
                }
                this.images = [];
                result.forEach(element => {
                    this.images.push({ source: element, alt: 'Description for Image', title: 'Image' });
                });
                if (this.images == []) {
                    this.images = [{ source: "assets/noimagefound.jpg" }];
                }
                // this.images = result.json();

            })
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
            this.getRooms();
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
            result.Room_Id = reservationRoom.Id;
            console.log(result);
            this.reservationService.addReservation(result).subscribe(() => {
                console.log('Ok')
            },
                error => {
                    console.log(error);
                });

        },
            error => {
                console.log(error);
            });
    }

    onSubmit(room: Room, form: NgForm) {

        room.Accomodation_Id = this.accommodation.Id;
        if (this.edit) {
            room.Id = this.room.Id;
            this.roomService.updateRoom(room).subscribe(
                () => {
                    console.log("OK");
                    this.getRooms();
                },
                error => {
                    console.log(error);
                });
            this.edit = false;

        } else {
            this.roomService.addRoom(room).subscribe(
                () => {
                    console.log("OK");
                    this.getRooms();
                },
                error => {
                    console.log(error);
                });
        }
        form.resetForm();
        this.ngOnInit();
    }

    onUpload(event) {
        debugger
        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'File Uploaded', detail: '' });
    }

    public hasBaseDropZoneOver: boolean = false;
    public hasAnotherDropZoneOver: boolean = false;

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    public fileOverAnother(e: any): void {
        this.hasAnotherDropZoneOver = e;
    }

    approve(accomodation_id) {
        this.accommodationService.approveAccommodation(accomodation_id).subscribe(
            () => {

                this.ngOnInit();
                console.log('Accomodation succesfully approved.');
            },
            error => { alert("Error while approving"); console.debug(error); })
    }

    deleteAccommodation(accommodation: Accommodation) {
    this.accommodationService.deleteAccommodation(accommodation).subscribe(
      () => {
        console.log('Accommodation ' + accommodation.Name + ' successfuly deleted');
        this.router.navigate(['/accomodation']);
      },
      error => { alert("Unsuccessful deleting operation!"); console.log(error); }

    );
  }
}
