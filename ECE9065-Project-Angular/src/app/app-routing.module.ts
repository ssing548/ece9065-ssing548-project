import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SongsListComponent } from './songs/songs-list/songs-list.component';

const routes: Routes = [ 
  {path:'songsList',component:SongsListComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
