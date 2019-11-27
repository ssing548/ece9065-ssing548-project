import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IPlaylist } from './playlist';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  private playlistUrl = 'assets/playlists.json';

  constructor(private http: HttpClient) { }

  getPlaylists(): Observable<IPlaylist[]>{
    return this.http.get<IPlaylist[]>(this.playlistUrl)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data)))
       
      );
  }


}
