import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Accommodation } from 'app/models/accommodation';
import { Place } from '../models/place';
import { AccommodationType } from '../models/accommodation-type';
import { HttpPlaceService } from '../place/place.http.service';
import { AccommodationTypeService } from '../services/accom-type-service';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MapDialogComponent } from '../map-dialog/map-dialog.component';
@Component({
    selector: 'app-accommodation-dialog',
    templateUrl: './accommodation-dialog.component.html',
    styleUrls: ['./accommodation-dialog.component.css'],
    providers: [HttpPlaceService, AccommodationTypeService]
})
export class AccommodationDialogComponent implements OnInit {

    public title: string;
    public accommodation: Accommodation;
    public places: Array<Place>;
    public types: Array<AccommodationType>;

    constructor(
        public dialogRef: MdDialogRef<AccommodationDialogComponent>,
        private placeService: HttpPlaceService,
        private accomTypeService: AccommodationTypeService,
        private dialog: MdDialog
    ) {

    }

    ngOnInit() {
        if (this.accommodation == undefined) {
            this.accommodation = new Accommodation();
        }
        this.placeService.getPlaces().subscribe((result: Array<Place>) => {
            this.places = result;
        });

        this.accomTypeService.getAccTypes().subscribe((result: Array<AccommodationType>) => {
            this.types = result;
        }
        );
    }

    onSubmit(accommodation: Accommodation, form: NgForm) {

        console.log(accommodation);
        if (!form.valid) {
            return;
        }
        form.reset();

        this.dialogRef.close(accommodation);
    }

    openMap() {
        let dialogRef = this.dialog.open(MapDialogComponent);
        dialogRef.afterClosed().subscribe((res) => {
            console.log("Upesno zatvoren map dialog");
            if (res == undefined) {
                return;
            }
            this.accommodation.Latitude = res.lat;
            this.accommodation.Longitude = res.lng;
        });
    }

}
