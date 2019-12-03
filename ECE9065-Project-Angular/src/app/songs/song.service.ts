import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ISong } from './songs';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  addNewSong(newSong: ISong) {
    console.log(newSong);
    console.log("Method not implemented." );
  }
  private songUrl = 'assets/songs.json';

  constructor(private http: HttpClient) { }

  getSongs(): Observable<ISong[]>{
    return this.http.get<ISong[]>(this.songUrl)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        map(data => data.sort((a,b)=> b.averageRating - a.averageRating))
       
      );
  }
}
