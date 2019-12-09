import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { SongsListComponent } from './songs/songs-list/songs-list.component';
import { ShowPlayListDialog } from './playlists/viewPlaylist/show-playlist-dialog';
import { AddNewSongDialog } from './songs/add-new-song/add-song-dialog';
import { HomeComponent } from './home/home.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';
import { ReviewComponent } from './Reviews/review/review.component';
import { AddReviewDialog } from './Reviews/add-review/add-new-review';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import { FormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CreateNewPlaylistDialog } from './playlists/createPlaylist/new-playlist-dialog'
import {MatListModule} from '@angular/material/list';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { RatingModule } from 'ng-starrating';
import { GoogleLoginProvider, AuthService } from 'angular-6-social-login';  
import { SocialLoginModule, AuthServiceConfig } from 'angular-6-social-login'; 
export function socialConfigs() {  
  const config = new AuthServiceConfig(  
    [  
      
      {  
        id: GoogleLoginProvider.PROVIDER_ID,  
        provider: new GoogleLoginProvider('981940788707-855184vmjdn5cgg8c3flqp1plcf2b5lp.apps.googleusercontent.com')  
      }  
    ]  
  );  
  return config;  
}  

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
    MatButtonToggleModule,
    RatingModule
  ],
  providers: [AuthService,  
    {  
      provide: AuthServiceConfig,  
      useFactory: socialConfigs  
    }  ],
  bootstrap: [AppComponent],
  entryComponents: [ReviewComponent, AddReviewDialog,SongsListComponent , ShowPlayListDialog,AddNewSongDialog,CreateNewPlaylistDialog] 
})
export class AppModule { }
