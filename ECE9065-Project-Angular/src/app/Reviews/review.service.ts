import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { IReview } from './review';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map, filter } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  deleteReviews(songId: string):Observable<any> {
    return this.http.request("DELETE",'http://localhost:3000/review/auth/deleteAllReviews',{
      headers: new HttpHeaders({
          
      }),
    body:{songId}, observe: 'response' });
    
    //return this.http.delete('http://localhost:3000/review/auth/deleteAllReviews',{ observe: 'response' });
  }
  
  private songUrl = 'assets/reviews.json';

  constructor(private http: HttpClient) { }

  // getReviews(songId:String): Observable<IReview[]>{
  //   return this.http.get<IReview[]>('http://localhost:3000/auth/review/getreviews')
  //     .pipe(
  //       tap(data => console.log('All: ' + JSON.stringify(data))),
  //      map(data => data.filter( data  => data.songId == songId)),
  //      map(data => data.sort((a, b) => new Date(b.submittedOn).getTime() - new Date(a.submittedOn).getTime()))
       
  //     );
  // }
  getReviews(songId:String): Observable<IReview[]>{
    return this.http.get<IReview[]>('http://localhost:3000/review/getreviews')
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
       map(data => data.filter( data  => data.songId == songId)),
       map(data => data.sort((a, b) => new Date(b.submittedOn).getTime() - new Date(a.submittedOn).getTime()))
       
      );
  }
  addNewReview(newReview: IReview):Observable<any> {
    console.log(newReview);
    return this.http.put('http://localhost:3000/review/auth/addreview',newReview);
  }
}

