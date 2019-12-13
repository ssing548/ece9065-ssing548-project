
import {Component} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
    selector: 'snack-bar-overview-example',
    templateUrl: 'add-to-playlist-bottomsheet.html'
  })
  export class PlaylistSnackBar {
    constructor(private _snackBar: MatSnackBar) {}
  
    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
        duration: 2000,
      });
    }
  }