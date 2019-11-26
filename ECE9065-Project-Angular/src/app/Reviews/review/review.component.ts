import { Component, OnInit, Input, Inject } from '@angular/core';
import { ReviewService } from '../review.service';
import { Observable, throwError } from 'rxjs';
import { IReview } from '../review';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface AddReviewDialogData {
  reviewText: string;
  rating: number;
}

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input() songId="";
  reviews: IReview[] = [];
  errorMessage = '';

  reviewText: string = "";
  rating: number ;

  constructor(private reviewService:ReviewService,public dialog: MatDialog) { }

  openDialog(): void {
    console.log(this.songId);
    const dialogRef = this.dialog.open(AddReviewDialog, {
      
      width: '290px',
     data: {rating: this.rating }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.reviewText = result.reviewText;
      this.rating = result.rating;
      console.log( this.reviewText+this.rating);
      this.addReview();
    });

    
  }

  addReview(){

    var newReview: IReview = {
      reviewId: "",
      songId: this.songId,
      submittedOn: new Date(),
      submitedBy: "AB",
      reviewDesc: this.reviewText,
      rating: this.rating,
      visibility: true
    };

    this.reviewService.addNewReview(newReview);

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

@Component({
  selector: 'add-review-dialog',
  templateUrl: 'add-review-dialog.html',
})
export class AddReviewDialog {

  constructor(
    public dialogRef: MatDialogRef<AddReviewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AddReviewDialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}