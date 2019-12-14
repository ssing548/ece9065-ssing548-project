import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { ISong } from './songs';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  getAllSongsForAdmin(): Observable<ISong[]>{
    return this.http.get<ISong[]>('http://localhost:3000/song/auth/songsForAdmin')
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        map(data => data.sort((a,b)=> b.averageRating - a.averageRating))
       
      );
  }

  deleteSong(songId: string) :Observable<any> {
    return this.http.request("DELETE",'http://localhost:3000/song/auth/deleteSong',{
      headers: new HttpHeaders({
          
      }),
    body:{songId}, observe: 'response' });
  }

  toggleVisibility(visibility: boolean, songId: string):Observable<any>  {
    var data = {
      "visibility": visibility,
      "songId":songId
    };
    console.log(data);
    return this.http.post('http://localhost:3000/song/auth/changevisibility',data, { observe: 'response' });
  }

  addNewSong(newSong: ISong):Observable<any> {

    //onsole.log("lo"+JSON.stringify(newSong));
    console.log("Method not implemented." );
    return this.http.put('http://localhost:3000/song/auth/addsong',newSong);
  }
  private songUrl = 'assets/songs.json';

  constructor(private http: HttpClient) { }

  getSongs(): Observable<ISong[]>{
    return this.http.get<ISong[]>('http://localhost:3000/song/getsongs')
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        map(data => data.sort((a,b)=> b.averageRating - a.averageRating))
       
      );
  }
}
