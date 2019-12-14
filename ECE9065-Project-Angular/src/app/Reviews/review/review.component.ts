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

 
  constructor(private reviewService: ReviewService, public dialog: MatDialog) { }

  openDialog(): void {
    // var reviewText: string = "";
    // var rating: number;
    // const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
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
              allReviews: this.reviews }
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   reviewText = result.reviewText;
    //   rating = result.rating;
    //   console.log(reviewText + rating);
    //   this.addReview(reviewText,rating);
    // });


  }

  ngOnInit() {
    console.log(this.songId);
    this.reviewService.getReviews(this.songId).subscribe({
      next: reviews => {
        this.reviews = reviews;
      },
      error: err => this.errorMessage = err
    });
  }
}

