import { Component, OnInit, Inject } from '@angular/core';
import { SongService } from '../song.service';
import { PlaylistService } from '../../playlists/playlist.service';
import { ISong } from '../songs';
import { IPlaylist } from '../../playlists/playlist';
import { MatTabChangeEvent } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CreateNewPlaylistDialog } from '../../playlists/createPlaylist/new-playlist-dialog'
import { AddNewSongDialog } from '../add-new-song/add-song-dialog';
import { ShowPlayListDialog } from '../../playlists/viewPlaylist/show-playlist-dialog';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AddToPlaylistBottomsheet } from '../../playlists/add-to-playlist/add-to-playlist-bottomsheet';

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
  isAuth: boolean;
  isAdmin:boolean;
  authUser:any;
  songsInPlaylist: ISong[] = [];

  constructor(private songService: SongService, private playlistService: PlaylistService,
    public dialog: MatDialog, private route: ActivatedRoute, private _bottomSheet: MatBottomSheet) {
    // console.log( "param"+this.route.snapshot.queryParamMap.get("flag"));
    // this.isAuth = this.route.snapshot.queryParamMap.get('flag') == "true" ? true : false;
    // console.log(this.isAuth);
  }

  openBottomSheet(songId: string): void {
    this._bottomSheet.open(AddToPlaylistBottomsheet, {
      data: {
        playlists: this.playlists,
        songId: songId
      }
    });
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

  }
  getListbyId(listId: string) {
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

  showAddSongDialog() {
    var user = JSON.parse(localStorage.getItem("socialusers"));
    var newSong: ISong = {
      songId: "",
      songTitle: "",
      artist: "",
      album: "",
      year: 2019,
      comment: "",
      genre: "",
      submittedOn: new Date(),
      submittedBy: user.email,
      numberOfRatings: 0,
      averageRating: 0
    };
    const dialogRef = this.dialog.open(AddNewSongDialog, {
      width: '400px',
      data: {
        newSong: newSong,
        allSongs: this.songs
      }
    });

  }

  showCreatePlaylistDialog(action: string, listId: string) {
    console.log(listId);
    var user = JSON.parse(localStorage.getItem("socialusers"));
    if (action == 'create') {
      var newPlaylist: IPlaylist = {
        listId: "",
        listTitle: "",
        listDesc: "",
        createdOn: new Date(),
        createdBy: user.email,
        visibility: true,
        songs: []
      };

      var allSongs: ISong[] = Object.assign([], this.songs);
      var playlistSongs: ISong[] = Object.assign([], this.songsInPlaylist);
    }
    else {
      var newPlaylist: IPlaylist = this.getListbyId(listId);

      var playlistSongs: ISong[] = [];
      for (var i = 0; i < newPlaylist.songs.length; i++) {
        playlistSongs.push(this.getSongById(newPlaylist.songs[i]))
      }

      var allSongs: ISong[] = Object.assign([], this.songs);
      for (var i = 0; i < newPlaylist.songs.length; i++)
        allSongs.splice(allSongs.findIndex(x => x.songId == newPlaylist.songs[i]), 1);


    }

    const dialogRef = this.dialog.open(CreateNewPlaylistDialog, {
      height: '400px',
      width: '600px',
      data: {
        availableSongs: allSongs,
        playlistInfo: newPlaylist,
        songsInPlaylist: playlistSongs,
        playlists: this.playlists,
        action: action
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

    });


  }
  ngOnInit() {
    this.route.params.subscribe(params => {
    
      this.isAuth = params['flag']; // (+) converts string 'id' to a number
      this.isAdmin = params['isadmin'];
      console.log( this.isAuth , this.isAdmin);
      this.authUser = JSON.parse(localStorage.getItem("socialusers"));
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

    var user = JSON.parse(localStorage.getItem("socialusers"));
    if (user) {

      this.playlistService.getLoggedInUserPlaylists(user.email).subscribe({
        next: playlists => {
          this.playlists = playlists;
          // this.searchedSongs = this.songs;
        },
        error: err => this.errorMessage = err
      });
    }
    else {
      this.playlistService.getPlaylists().subscribe({
        next: playlists => {
          this.playlists = playlists;
          // this.searchedSongs = this.songs;
        },
        error: err => this.errorMessage = err
      });
    }


  }
  togglePlaylistVisibility(action: string, playlistId: string) {
    var visibility: boolean;
    if (action == "hide")
      visibility = false;

    else
      visibility = true

    console.log("playlist id is" + playlistId);
    this.playlistService.toggleVisibility(visibility, playlistId).subscribe(res => {
      if (res && res.status == 200) {
        console.log(res.status);
        this.getListbyId(playlistId).visibility = visibility;
      }
    });


  }
  onPlaylistPanelSelected(event: MatTabChangeEvent) {

    console.log('index => ', event.index);

  }

}



