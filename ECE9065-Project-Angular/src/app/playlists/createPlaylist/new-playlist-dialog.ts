import { Component, Inject } from '@angular/core';
import { IPlaylist } from '../playlist';
import { ISong } from '../../songs/songs';
import { INewPlaylistData } from './new-playlist-data';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
    selector: 'show-create-playlist-dialog',
    templateUrl: './new-playlist-dialog.html',
    styleUrls: ['./new-playlist-dialog.css']
  })
  export class CreateNewPlaylistDialog {
    searchedSongs: ISong[] = this.data.availableSongs;
    _songSearchBy = '';
  get songSearchBy(): string {
    return this._songSearchBy;
  }
  set songSearchBy(value: string) {
    this._songSearchBy = value;
    this.searchedSongs = this.songSearchBy ? this.performSearch(this.songSearchBy) : this.data.availableSongs;
  }

  performSearch(searchBy: string): ISong[] {
    searchBy = searchBy.toLocaleLowerCase();
    return this.data.availableSongs.filter((song: ISong) =>
      song.songTitle.toLocaleLowerCase().indexOf(searchBy) !== -1);
  }
    constructor(
      public dialogRef: MatDialogRef<CreateNewPlaylistDialog>,
      @Inject(MAT_DIALOG_DATA) public data: INewPlaylistData) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    onAddClicked(songId:String){
      var selectedSong = this.data.availableSongs.splice(this.data.availableSongs.findIndex(x => x.songId == songId),1)[0];
      this.data.songsInPlaylist.push(selectedSong);
      this.data.playlistInfo.songs.push(selectedSong.songId);
     // this.searchedSongs = this.data.availableSongs;
      this.searchedSongs = this.performSearch(this.songSearchBy);
    }

    onRemoveClicked(songId:String){
    
      var selectedSong = this.data.songsInPlaylist.splice(this.data.songsInPlaylist.findIndex(x => x.songId == songId),1)[0];
      this.data.availableSongs.push(selectedSong);
      this.data.playlistInfo.songs.splice(this.data.playlistInfo.songs.findIndex(x => x == songId),1);
     // this.searchedSongs = this.data.availableSongs;
      this.searchedSongs = this.performSearch(this.songSearchBy);
    }


  }