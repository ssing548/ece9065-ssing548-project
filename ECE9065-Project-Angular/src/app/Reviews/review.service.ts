import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IReview } from './review';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  
  private songUrl = 'assets/reviews.json';

  constructor(private http: HttpClient) { }

  getReviews(songId:String): Observable<IReview[]>{
    return this.http.get<IReview[]>(this.songUrl)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
       map(data => data.filter( data  => data.songId == songId)),
       map(data => data.sort((a, b) => new Date(b.submittedOn).getTime() - new Date(a.submittedOn).getTime()))
       
      );
  }

  addNewReview(newReview: IReview) {
    console.log("Method not implemented.");
  }
}

