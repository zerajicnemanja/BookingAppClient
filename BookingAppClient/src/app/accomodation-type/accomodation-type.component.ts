import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { FormsModule, NgForm } from '@angular/forms';
import { AccommodationType } from '../models/accommodation-type';
import { AccommodationTypeService } from '../services/accom-type-service';
import { MdSnackBar } from '@angular/material';


@Component({
    selector: 'app-accomodation-type',
    templateUrl: './accomodation-type.component.html',
    styleUrls: ['./accomodation-type.component.css'],
    providers: [AccommodationTypeService]
})
export class AccomodationTypeComponent implements OnInit {

    errorMessage: string;
    accTypes: Array<AccommodationType>;
    constructor(private accTypeService: AccommodationTypeService, private snackbar: MdSnackBar) { }

    ngOnInit() {
        this.accTypeService.getAccTypes().subscribe(
            res => this.accTypes = res,
            error => { alert("Unsuccessful fetch operation! AccomodationType"); console.log(error); })
    }

    save(accType: AccommodationType, f: NgForm) {

        this.accTypeService.postType(accType).subscribe(
            () => {
                console.log('AccomodationType ' + accType.Name + ' successfuly posted');
                this.snackbar.open('AccomodationType ' + accType.Name + ' successfuly added', "", { duration: 3000 });

                this.errorMessage = undefined;
                f.resetForm();
                this.ngOnInit();
            },

            (error: any) => {
                this.errorMessage = error.json().Message;
                console.log(error);
            }
        );
    }

    delete(accType) {
        console.log("Start deleting " + accType.Name);
        this.accTypeService.delete(accType).subscribe(
            () => {
                console.log('AccomodationType ' + accType.Name + ' successfuly deleted');
                this.snackbar.open('AccomodationType ' + accType.Name + ' successfuly deleted', "", { duration: 3000 });
                this.ngOnInit();
            },
            error => { alert("Unsuccessful deleting operation!"); console.log(error); }
        );
    }

}
