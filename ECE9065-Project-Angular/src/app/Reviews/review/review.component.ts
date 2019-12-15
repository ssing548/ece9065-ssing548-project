import { Component, OnInit, Input, Inject } from '@angular/core';
import { ReviewService } from '../review.service';
import { Observable, throwError } from 'rxjs';
import { IReview } from '../review';
import { MatDialog,MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StarRatingComponent } from 'ng-starrating';
import { AddReviewDialog } from '../add-review/add-new-review';


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input() songId = "";
  @Input() isAuth;
  reviews: IReview[] = [];
  errorMessage = '';
  avgRating:number=0;
   
 
  constructor(private reviewService: ReviewService, public dialog: MatDialog) { }

  openDialog(): void {
  
    console.log(this.songId);
    var user = JSON.parse(localStorage.getItem("socialusers"));
    var newReview:IReview = {

      reviewId: "",
      songId: this.songId,
      submittedOn: new Date(),
      submitedBy: user.email,
      reviewDesc: "",
      rating: 1,
      visibility: true
    }

    const dialogRef = this.dialog.open(AddReviewDialog, {

      width: '290px',
      data: { newReview: newReview,
              allReviews: this.reviews,
              avgRating:this.avgRating }
    });
  }

  calculateAvgRating(){
    for(var i = 0 ;i< this.reviews.length;i++){
      this.avgRating = this.avgRating + this.reviews[i].rating;
    }
    this.avgRating =  Math.round(this.avgRating/this.reviews.length);
  }
  ngOnInit() {
    console.log(this.songId);
    this.reviewService.getReviews(this.songId).subscribe({
      next: reviews => {
        this.reviews = reviews;
        this.calculateAvgRating();
      },
      error: err => this.errorMessage = err
    });

    
  }
}

