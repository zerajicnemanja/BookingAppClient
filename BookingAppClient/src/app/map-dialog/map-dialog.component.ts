import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.css'],
  styles: ['agm-map {height: 400px; width: 400px;}']
})
export class MapDialogComponent implements OnInit {
  
  lat: number = 45.242268;
  lng: number = 19.842954;
  clickedLat: number;
  clickedLong: number;
  constructor(
    public dialogRef: MdDialogRef<MapDialogComponent>
  ) { }

  ngOnInit() {
  }

  onClick(res:any){
    //debugger
    this.clickedLat = res.coords.lat;
    this.clickedLong = res.coords.lng;
  }

  setLocation(){
    this.dialogRef.close({lat : this.clickedLat, lng : this.clickedLong});
  }

}
