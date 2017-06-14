import { Component, OnInit } from '@angular/core';
import { HttpPlaceService } from './place.http.service';
import { Place } from './place.model';
import { MdDialog, MdSnackBar } from '@angular/material';
import { DialogPlaceComponent } from './dialog-place-component';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css'],
  providers: [HttpPlaceService]
})
export class PlaceComponent implements OnInit {
  places: Array<Place>;

  constructor(private httpPlaceService: HttpPlaceService, public dialog: MdDialog, public snackbar: MdSnackBar) { }

  ngOnInit() {

    this.httpPlaceService.getPlaces().subscribe((res: any) => {
      this.places = res; console.log(this.places)
    },
      error => { alert("Unsuccessful fetch operation!"); console.log(error); }
    );
  }

  openAddDialog() {
    let dialogRef = this.dialog.open(DialogPlaceComponent);
    dialogRef.componentInstance.title = "Adding new Place";
    dialogRef.componentInstance.isEditing = false;

    dialogRef.afterClosed().subscribe((result: Place) => {

      if (result == undefined || null) {
        return;//case when you click outside the dialog
      }
      this.snackbar.open('Place ' + result.Name + ' successfuly added', "", { duration: 3000 });
      this.ngOnInit();
    })
  }

  editPlace(place: Place) {
    console.log("Start editing " + place.Name);

    let dialogRef = this.dialog.open(DialogPlaceComponent);
    dialogRef.componentInstance.title = "Editing Region";
    dialogRef.componentInstance.selectedPlace = place;
    dialogRef.componentInstance.isEditing = true;

    dialogRef.afterClosed().subscribe((result: Place) => {

      if (result == undefined || null) {
        return;//case when you click outside the dialog
      }

      this.snackbar.open('Place ' + result.Name + ' successfuly edited', "", { duration: 3000 });
      this.ngOnInit();

    })
  }
  deletePlace(place: Place) {

    console.log("Start deleting " + place.Name);
    this.httpPlaceService.deletePlace(place).subscribe(
      () => {
        console.log('Place ' + place.Name + ' successfuly deleted');
        this.ngOnInit();
      },
      error => { alert("Unsuccessful deleting operation!"); console.log(error); }
    );
  }


}
