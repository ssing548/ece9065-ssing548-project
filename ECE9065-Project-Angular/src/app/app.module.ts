import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { SongsListComponent , ShowPlayListDialog, AddNewSongDialog } from './songs/songs-list/songs-list.component';
import { HomeComponent } from './home/home.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';
import { ReviewComponent , AddReviewDialog } from './Reviews/review/review.component';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import { FormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CreateNewPlaylistDialog } from './playlists/createPlaylist/new-playlist-dialog'
import {MatListModule} from '@angular/material/list';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
@NgModule({
  declarations: [
    AppComponent,
    SongsListComponent,
    HomeComponent,
    ReviewComponent,
    AddReviewDialog,
    ShowPlayListDialog,
    AddNewSongDialog,
    CreateNewPlaylistDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatExpansionModule,
    HttpClientModule,
    MatCardModule,
    MatTabsModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ReviewComponent, AddReviewDialog,SongsListComponent , ShowPlayListDialog,AddNewSongDialog,CreateNewPlaylistDialog] 
})
export class AppModule { }
