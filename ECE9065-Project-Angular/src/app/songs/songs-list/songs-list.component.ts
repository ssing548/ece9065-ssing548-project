import { Component, OnInit, Inject } from '@angular/core';
import { SongService } from '../song.service';
import { PlaylistService } from '../../playlists/playlist.service';
import { Observable, throwError } from 'rxjs';
import { ISong } from '../songs';
import { IPlaylist } from '../../playlists/playlist';
import { ReviewComponent } from '../../Reviews/review/review.component';
import { MatTabChangeEvent } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface PlaylistDialogData {
  playlist: IPlaylist,
  songs: ISong[]
}

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.css']
})
export class SongsListComponent implements OnInit {

  panelOpenState = false;
  songs: ISong[] = [];
  playlists: IPlaylist[] = [];
  searchedSongs: ISong[] = [];
  errorMessage = '';
  selected = 'songs';
  constructor(private songService: SongService, private playlistService: PlaylistService,
    public dialog: MatDialog) { }

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

  showPlaylistDialog(event: Event, listId: string): void {
    //console.log(this.song);
    var plist;
    for (var i = 0; i < this.playlists.length; i++) {
      if (this.playlists[i].listId === listId)
        plist = this.playlists[i];

    }
    var plsongs: ISong[] = [];
    for (var i = 0; i < plist.songs.length; i++) {
      plsongs.push(this.getSongById(plist.songs[i]))
    }

    console.log("hi" + plsongs[0]);
    const dialogRef = this.dialog.open(ShowPlayListDialog, {
      width: '400px',
      data: {
        playlist: plist,
        songs: plsongs
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.reviewText = result.reviewText;
      // this.rating = result.rating;
      // console.log( this.reviewText+this.rating);
      //this.addReview();
    });


  }

  getSongById(songId: String): ISong {
    for (var i = 0; i < this.songs.length; i++) {
      if (this.songs[i].songId == songId) {
        console.log("i am returning " + this.songs[i].songId);
        return this.songs[i];
      }
    }
  }

  ngOnInit() {
    this.songService.getSongs().subscribe({
      next: songs => {
        this.songs = songs;
        this.searchedSongs = this.songs;
      },
      error: err => this.errorMessage = err
    });

    this.playlistService.getPlaylists().subscribe({
      next: playlists => {
        this.playlists = playlists;
        // this.searchedSongs = this.songs;
      },
      error: err => this.errorMessage = err
    });
  }

  onPlaylistPanelSelected(event: MatTabChangeEvent) {

    console.log('index => ', event.index);

  }

}

@Component({
  selector: 'show-playlist-dialog',
  templateUrl: '../../playlists/show-playlist-dialog.html',
})
export class ShowPlayListDialog {

  constructor(
    public dialogRef: MatDialogRef<ShowPlayListDialog>,
    @Inject(MAT_DIALOG_DATA) public data: PlaylistDialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}