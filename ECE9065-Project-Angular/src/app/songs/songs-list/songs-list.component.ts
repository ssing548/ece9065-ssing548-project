import { Component, OnInit, Inject } from '@angular/core';
import { SongService } from '../song.service';
import { PlaylistService } from '../../playlists/playlist.service';
import { Observable, throwError } from 'rxjs';
import { ISong } from '../songs';
import { IPlaylist } from '../../playlists/playlist';
import { ReviewComponent } from '../../Reviews/review/review.component';
import { MatTabChangeEvent } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CreateNewPlaylistDialog } from '../../playlists/createPlaylist/new-playlist-dialog'
import { INewPlaylistData } from '../../playlists/createPlaylist/new-playlist-data';
export interface PlaylistDialogData {
  playlist: IPlaylist,
  songs: ISong[]
}

export interface AddNewSongDialogData{
  songId: string;
  songTitle: string;
  artist: string;
  album: string;
  year: number;
  comment: string;
  genre: string;
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
  isAuth:boolean;
  songsInPlaylist: ISong[] = [];
  

  newSong:AddNewSongDialogData={
    songId : "",
    songTitle: "",
    artist: "",
    album: "",
    year: 2019,
    comment: "",
    genre: ""
}; 

  constructor(private songService: SongService, private playlistService: PlaylistService,
    public dialog: MatDialog,private route: ActivatedRoute) { 
      // console.log( "param"+this.route.snapshot.queryParamMap.get("flag"));
      // this.isAuth = this.route.snapshot.queryParamMap.get('flag') == "true" ? true : false;
      // console.log(this.isAuth);
    }

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
    var plist = this.getListbyId(listId);
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
      // console.log('The dialog was closed');
      // this.reviewText = result.reviewText;
      // this.rating = result.rating;
      // console.log( this.reviewText+this.rating);
     // this.addReview();
    });

  }
  getListbyId(listId:string){
    for (var i = 0; i < this.playlists.length; i++) {
      if (this.playlists[i].listId === listId)
          return this.playlists[i];

    }
  }
  getSongById(songId: String): ISong {
    for (var i = 0; i < this.songs.length; i++) {
      if (this.songs[i].songId == songId) {
        console.log("i am returning " + this.songs[i].songId);
        return this.songs[i];
      }
    }
  }

  showAddSongDialog(){
    const dialogRef = this.dialog.open(AddNewSongDialog, {
      width: '400px',
       data: {
        newSong:this.newSong  
       }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(this.newSong);
      this.songService.addNewSong(this.newSong);

    });

  }

  showCreatePlaylistDialog(action:string,listId: string){
    if(action == 'create'){
    var newPlaylist:IPlaylist = {
      listId: "",
      listTitle: "",
      listDesc: "",
      createdOn: new Date(),
      createdBy: "",
      visibility: true,
      songs: []
    };

    var allSongs:ISong[] = Object.assign([], this.songs);
    var playlistSongs:ISong[] = Object.assign([],this.songsInPlaylist);
  }
    else{
      var newPlaylist:IPlaylist = this.getListbyId(listId);
      
      var playlistSongs:ISong[]  = [];
      for (var i = 0; i < newPlaylist.songs.length; i++) {
        playlistSongs.push(this.getSongById(newPlaylist.songs[i]))
      }

      var allSongs:ISong[] = Object.assign([], this.songs);
      for (var i = 0; i < newPlaylist.songs.length; i++)
        allSongs.splice(allSongs.findIndex( x => x.songId == newPlaylist.songs[i]),1);


    }

    const dialogRef = this.dialog.open(CreateNewPlaylistDialog, {
      height: '400px',
      width: '600px',
       data: {
        availableSongs: allSongs,
        playlistInfo: newPlaylist,
        songsInPlaylist: playlistSongs
       }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    
    });

    
}
  ngOnInit() {

    this.route.params.subscribe(params => {
      this.isAuth = params['flag']; // (+) converts string 'id' to a number
      console.log(this.isAuth)
      // In a real app: dispatch action to load the details here.
   });

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

@Component({
  selector: 'show-addSong-dialog',
  templateUrl: '../add-song-dialog.html',
})
export class AddNewSongDialog {

  constructor(
    public dialogRef: MatDialogRef<AddNewSongDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AddNewSongDialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}