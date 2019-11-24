import { Component, OnInit } from '@angular/core';
import { SongService } from '../song.service';
import { Observable, throwError } from 'rxjs';
import { ISong } from '../songs';
import { ReviewComponent } from '../../Reviews/review/review.component';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.css']
})
export class SongsListComponent implements OnInit {

  panelOpenState = false;
  songs: ISong[] = [];
  searchedSongs: ISong[] = [];
  errorMessage = '';

  constructor(private songService: SongService) { }

  _songSearchBy = '';
  get songSearchBy(): string {
    return this._songSearchBy;
  }
  set songSearchBy(value: string) {
    this._songSearchBy = value;
    this.searchedSongs = this.songSearchBy ? this.performSearch(this.songSearchBy) : this.songs;
  }

  performSearch(searchBy: string): ISong[] {
    searchBy = searchBy.toLocaleLowerCase();
    return this.songs.filter((song: ISong) =>
      song.songTitle.toLocaleLowerCase().indexOf(searchBy) !== -1);
  }


  ngOnInit() {
    this.songService.getSongs().subscribe({
      next: songs => {
        this.songs = songs;
        this.searchedSongs = this.songs;
      },
      error: err => this.errorMessage = err
    });
  }


}
