import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Region } from './region.model';
import { Observable } from "rxjs/Observable";
import { HttpRegionService } from './region.http.service';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { DialogRegionComponent } from './dialog-region-component';
@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css'],
  providers: [HttpRegionService]
})
export class RegionComponent implements OnInit {

  private regions: Array<Region>;

  constructor(private httpRegionService: HttpRegionService, public dialog: MdDialog, public snackbar: MdSnackBar) {
  }
  ngOnInit() {

    this.httpRegionService.getRegions().subscribe((res: any) => {
      this.regions = res; console.log(this.regions)
    },
      error => { alert("Unsuccessful fetch operation!"); console.log(error); }
    );
  }

  openAddDialog() {
    let dialogRef = this.dialog.open(DialogRegionComponent);
    dialogRef.componentInstance.title = "Adding new Region";
    dialogRef.componentInstance.isEditing = false;
    dialogRef.afterClosed().subscribe((result: Region) => {

      if (result == undefined || null) {
        return;//case when you click outside the dialog
      }
      this.snackbar.open('Region ' + result.Name + ' successfuly additng', "", { duration: 3000 });

      this.ngOnInit();

    })
  }

  editRegion(region: Region) {
    console.log("Start editing " + region.Name);

    let dialogRef = this.dialog.open(DialogRegionComponent);
    dialogRef.componentInstance.title = "Editing Region";
    dialogRef.componentInstance.selectedRegion = region;
    dialogRef.componentInstance.isEditing = true;
    
    dialogRef.afterClosed().subscribe((result: Region) => {

      if (result == undefined || null) {
        return;//case when you click outside the dialog
      }

      this.snackbar.open('Region ' + result.Name + ' successfuly editing', "", { duration: 3000 });
      this.ngOnInit();

    })
  }
  deleteRegion(region: Region) {

    console.log("Start deleting " + region.Name);
    this.httpRegionService.deleteRegion(region).subscribe(
      () => {
        console.log('Region ' + region.Name + ' successfuly deleted');
        this.ngOnInit();
      },
      error => { alert("Unsuccessful deleting operation!"); console.log(error); }
    );
  }

}
