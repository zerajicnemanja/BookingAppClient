import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AccommodationDialogComponent } from 'app/accommodation-dialog/accommodation-dialog.component'
import { Accommodation } from 'app/models/accommodation';
import { MdDialog } from '@angular/material';
import { AccommodationService } from '../services/accommodation-service';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AccommodationDetailsComponent } from "app/accommodation-details/accommodation-details.component";
import { Router } from "@angular/router";
import { SearchComponent } from 'app/search/search.component';

@Component({
  selector: 'app-accomodation',
  templateUrl: './accomodation.component.html',
  styleUrls: ['./accomodation.component.css'],
  providers: [AccommodationService],

})
export class AccomodationComponent implements OnInit {

  accommodations: Array<Accommodation>;

  public role: string;

  constructor(private accommodationService: AccommodationService, public dialog: MdDialog, private router: Router) { 
    this.role = localStorage.getItem("role");
  }

  ngOnInit() {

    
    let username = localStorage.getItem("username");
    if (this.role == "Manager") {
      this.accommodationService.getAccommodationForOwner(username).subscribe((res: any) => {
        this.accommodations = res; console.log(this.accommodations)
      },
        error => { alert("Unsuccessful fetch operation! Accomodation"); console.log(error); }
      );
    } else {
      this.accommodationService.getAccommodations().subscribe((res: any) => {
        this.accommodations = res; console.log(this.accommodations)
      },
        error => { alert("Unsuccessful fetch operation! Accomodation"); console.log(error); }
      );
    }
  }


  openAddDialog() {

    let dialogRef = this.dialog.open(AccommodationDialogComponent);
    dialogRef.componentInstance.title = "Adding new Accommodation";
    dialogRef.afterClosed().subscribe((result: Accommodation) => {
      if (result == undefined || null) {
        return;//case when you click outside the dialog
      }
      this.accommodationService.addAccomodation(result).subscribe(() => {
        console.log('Accomodation ' + result.Name + ' successfuly posted');
        this.ngOnInit();
      },
        error => {
          alert("Close!"); console.log(error);
        }
      );
    })

  }

  editAccommodation(accommodation: Accommodation) {
    let dialogRef = this.dialog.open(AccommodationDialogComponent);
    dialogRef.componentInstance.title = "Editing Accommodation";
    dialogRef.componentInstance.accommodation = accommodation;
    dialogRef.afterClosed().subscribe((result: Accommodation) => {
      if (result == undefined || null) {
        return;
      }

      result.Id = accommodation.Id;
      result.AppUser_Id = accommodation.AppUser_Id;

      this.accommodationService.updateAccommodation(result).subscribe(
        () => {
          console.log('Accommodation ' + result.Name + ' successfuly edited');
          this.ngOnInit();
        },
        error => { alert("Close!"); console.log(error); }
      );

    });


  }

  deleteAccommodation(accommodation: Accommodation) {
    this.accommodationService.deleteAccommodation(accommodation).subscribe(
      () => {
        console.log('Accommodation ' + accommodation.Name + ' successfuly deleted');
        this.ngOnInit();
      },
      error => { alert("Unsuccessful deleting operation!"); console.log(error); }

    );
  }

  accommodationDetails(accommodation: Accommodation) {
    this.router.navigate(['/accommodation-details/' + accommodation.Id]);


  }

  onNotify(accommodationList: Array<Accommodation>): void {
    this.accommodations = accommodationList;
  }

  approve(accomodation_id){
    this.accommodationService.approveAccommodation(accomodation_id).subscribe(
      ()=>{

        this.ngOnInit();
        console.log('Accomodation succesfully approved.');
      },
      error=>{alert("Error while approving"); console.debug(error);})
  }

  getImageFromPath(paths:string){
    if(paths == null && paths == undefined){
      return "assets/noimagefound.jpg";
    }
    let ps = paths.split('#');
    if(ps[1] == null || ps[1] == undefined|| ps[1]==""){
      return "assets/noimagefound.jpg";
    }else{
      return ps[1];
    }
  }
}
