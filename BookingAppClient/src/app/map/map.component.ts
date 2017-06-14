import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  styles: ['agm-map {height: 400px; width: 400px;}']
})
export class MapComponent implements OnInit {

  lat: number = 45.242268;
  lng: number = 19.842954;
  clickedLat: number;
  clickedLong: number;
  constructor(
    
  ) { }

  ngOnInit() {
  }

  onClick(res:any){
    //debugger
    this.clickedLat = res.coords.lat;
    this.clickedLong = res.coords.lng;
  }

}
