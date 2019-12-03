import { Component, OnInit, Input, Inject } from '@angular/core';
import { ReviewService } from '../review.service';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StarRatingComponent } from 'ng-starrating';
import { AddReviewDialogData } from './new-review-data';

@Component({
    selector: 'add-review-dialog',
    templateUrl: 'add-review-dialog.html',
  })
  export class AddReviewDialog {
  
    constructor(
      public dialogRef: MatDialogRef<AddReviewDialog>,private reviewService: ReviewService,
      @Inject(MAT_DIALOG_DATA) public data: AddReviewDialogData) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    save() {
      // this.dialogRef.close(this.data.reviewText);
      console.log("new Review is" + this.data.newReview);
      this.reviewService.addNewReview(this.data.newReview);
    }
  
  
    onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
  
     // console.log($event.newValue);
      this.data.newReview.rating = $event.newValue;
    }
  
  }