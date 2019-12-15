import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { Component,Inject, OnInit } from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { IAddToPlaylistData } from './add-to-playlist-data';
import { IPlaylist } from '../playlist';
import { PlaylistService } from '../playlist.service';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
    selector: 'bottom-sheet-overview-example-sheet',
    templateUrl: 'add-to-playlist-bottomsheet.html',
    styleUrls: ['./add-to-playlist-bottomsheet.css']
  })
  export class AddToPlaylistBottomsheet implements OnInit{
  playlistsToshow:IPlaylist[] = [];
 
   ngOnInit(): void {
    console.log(this.data);
    for(var i = 0; i < this.data.playlists.length; i ++){
      if(this.data.playlists[i].createdBy == this.data.loggedInUser.email){
        console.log(this.data.playlists[i].listTitle);
        if(this.data.playlists[i].songs.indexOf(this.data.songId) < 0)
          this.playlistsToshow.push(this.data.playlists[i]);

      }
    }
  }
    
    constructor(private _bottomSheetRef: MatBottomSheetRef<AddToPlaylistBottomsheet>,private _snackBar: MatSnackBar,
      private playlistService:PlaylistService,
      @Inject(MAT_BOTTOM_SHEET_DATA) public data: IAddToPlaylistData) {}
  
      addSongToPlaylist(playlist:IPlaylist){
          playlist.songs.push(this.data.songId);
         
          this.playlistService.editPlaylist(playlist).subscribe(res=>{
            if(res.status == 200)
            this.openSnackBar("Song Added!","OK");
          });   
      }

      openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
          duration: 2000,
        });
      }
  }