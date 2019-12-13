import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IPlaylist } from './playlist';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  toggleVisibility(visibility: boolean, playlistId: string):Observable<any> {
    var data = {
      "visibility": visibility,
      "playlistId":playlistId
    };
    console.log(data);
    return this.http.post('http://localhost:3000/playlist/auth/changevisibility',data, { observe: 'response' });
  }

  editPlaylist(playlistInfo: IPlaylist):Observable<any>  {
    return this.http.post('http://localhost:3000/playlist/auth/editplaylist',playlistInfo,{ observe: 'response' });
  }
  
  addPlaylist(playlistInfo: IPlaylist):Observable<any>  {
    return this.http.put('http://localhost:3000/playlist/auth/addplaylist',playlistInfo);
  }

  private playlistUrl = 'assets/playlists.json';

  constructor(private http: HttpClient) { }

  getPlaylists(): Observable<IPlaylist[]>{
    return this.http.get<IPlaylist[]>('http://localhost:3000/playlist/getplaylists')
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data)))
       
      );
  }


}
