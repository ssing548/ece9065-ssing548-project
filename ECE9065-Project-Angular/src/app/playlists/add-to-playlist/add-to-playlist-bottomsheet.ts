import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { Component,Inject } from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { IAddToPlaylistData } from './add-to-playlist-data';
import { IPlaylist } from '../playlist';
import { PlaylistService } from '../playlist.service';
@Component({
    selector: 'bottom-sheet-overview-example-sheet',
    templateUrl: 'add-to-playlist-bottomsheet.html',
    styleUrls: ['./add-to-playlist-bottomsheet.css']
  })
  export class AddToPlaylistBottomsheet {
    songadded:boolean = false;
    status:string = "";
    songExist:boolean = false;
    constructor(private _bottomSheetRef: MatBottomSheetRef<AddToPlaylistBottomsheet>,private playlistService:PlaylistService,
      @Inject(MAT_BOTTOM_SHEET_DATA) public data: IAddToPlaylistData) {}
  
      addSongToPlaylist(playlist:IPlaylist){
        console.log("i m in ");
       
        for(var i = 0 ; i < playlist.songs.length;i++){
          if(this.data.songId == playlist.songs[i]){
            this.songExist = true;
          
            break;
          }
        }

        if(!this.songExist){
          playlist.songs.push(this.data.songId);
          this.playlistService.editPlaylist(playlist).subscribe(res=>{
            this.songadded = true;
            

          });

        }
      }
  }