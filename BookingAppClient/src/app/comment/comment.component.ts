import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  providers:[CommentService]
})
export class CommentComponent implements OnInit {

  @Input() accomodationId: number;

  comments:Array<Comment>
  rating:number;
  constructor(private commentService:CommentService) { }

  ngOnInit() {
    this.rating = 3;
    this.commentService.getCommentForAccs(this.accomodationId).subscribe(
       res =>{ 
         this.comments = res},

       error => { alert("Unsuccessful fetch operation! Comments"); console.log(error); }
    )
  }

  onClick(res:any){

    let r = res;
}

}
