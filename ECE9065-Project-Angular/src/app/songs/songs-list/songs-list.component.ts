import { Component, OnInit } from '@angular/core';
import { SongService } from '../song.service';
import { Observable, throwError } from 'rxjs';
import { ISong } from '../songs';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.css']
})
export class SongsListComponent implements OnInit {

  panelOpenState = false;
  songs: ISong[] = [];
  errorMessage = '';

  constructor(private songService: SongService) { }

  ngOnInit() {
    this.songService.getSongs().subscribe({
      next: songs => {
        this.songs = songs;
      },
      error: err => this.errorMessage = err
    });
  }
  
}
