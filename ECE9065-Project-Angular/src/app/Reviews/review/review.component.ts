import { Component, OnInit, Input } from '@angular/core';
import { ReviewService } from '../review.service';
import { Observable, throwError } from 'rxjs';
import { IReview } from '../review';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input() songId="";
  reviews: IReview[] = [];
  errorMessage = '';

  constructor(private reviewService:ReviewService) { }

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
