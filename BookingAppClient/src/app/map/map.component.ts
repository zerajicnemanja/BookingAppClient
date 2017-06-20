import { Component, OnInit, Input } from '@angular/core';
import { AccommodationService } from '../services/accommodation-service';
import { Accommodation } from 'app/models/accommodation';
import { element } from 'protractor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [AccommodationService],
  styles: ['agm-map {height: 400px; width: 600px;}']
})
export class MapComponent implements OnInit {

  lat: number = 45.242268;
  lng: number = 19.842954;

  @Input() accommodations: Array<Accommodation>=[];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    // this.accommodations = [];
    // this.accommodationService.getAccommodations().subscribe(
    //   (accs: Array<Accommodation>)=>{
    //     accs.forEach(element => {
    //       if(element.Approved){
    //         this.accommodations.push(element);
    //       }
    //     });
    //   },  
    //   error => { alert("Error while getAccomodations in MapComponent"); console.error(error);}
    // )
  }

  navigateTo(acc_id:number){

    this.router.navigate(['accommodation-details/'+acc_id]);
    location.reload();
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
