import { Component, Inject } from '@angular/core';
import { SongService } from '../song.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddNewSongDialogData } from '../add-new-song/new-song-dialog-data';

@Component({
    selector: 'show-addSong-dialog',
    templateUrl: './add-song-dialog.html',
  })
  export class AddNewSongDialog {
  
    constructor(
      public dialogRef: MatDialogRef<AddNewSongDialog>,private songService: SongService,
      @Inject(MAT_DIALOG_DATA) public data: AddNewSongDialogData) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }

    save() {
        console.log("new Review is" + this.data.newSong);
        this.songService.addNewSong(this.data.newSong)
      }
  
  }