import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../services/comment.service';
import { MyComment } from "app/comment/comment.model";
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  providers: [CommentService]
})
export class CommentComponent implements OnInit {

  @Input() accomodationId: number;

  comment: MyComment = new MyComment();
  comments: Array<MyComment>
  rating: number;
  constructor(private commentService: CommentService, private snackbar: MdSnackBar) { }
  isAbleToComment:boolean = false;
  ngOnInit() {

    this.comment = new MyComment();
    this.comment.Rate = 1;

    this.commentService.getCommentForAccs(this.accomodationId).subscribe(
      res => {
        this.comments = res
      },

      error => { alert("Unsuccessful fetch operation! Comments"); console.log(error); }
    )

    this.commentService.getIsAbleToComment(this.accomodationId).subscribe(
      res => {
        this.isAbleToComment =  res == "true" ? true : false ;
      },

      error => { alert("Unsuccessful fetch operation getIsAbleToComment! Comments"); console.log(error); }
    )

    this.rating = 3;

  }

  onClick() {

    let comment = {
      Accomodation_Id: this.accomodationId,
      Text: this.comment.Text,
      Rate: this.comment.Rate,
      Username: localStorage.getItem("username")

    }
    this.commentService.addComment(comment).subscribe(
      (res) => {
        console.log(res);
        this.snackbar.open('Comment successfuly added', "", { duration: 3000 });

        this.ngOnInit()
      },
      error => {
        alert(error);
        console.debug(error);
      }


    )
    // let r = res;
  }

}
