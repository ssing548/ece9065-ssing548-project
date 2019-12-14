import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SongsListComponent } from './songs/songs-list/songs-list.component';
import { HomeComponent } from './home/home.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [ 
  {path:'',component:HomeComponent},
  {path:'songsList',component:SongsListComponent},
  {path:'auth/:flag',component:SongsListComponent,canActivate:[AuthGuard]},
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
