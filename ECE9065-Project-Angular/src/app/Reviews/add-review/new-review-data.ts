import { IReview } from '../review';
export interface AddReviewDialogData {
    // reviewText: string;
    // rating: number;
    newReview:IReview;
    allReviews:IReview[];
    avgRating:number;
  }