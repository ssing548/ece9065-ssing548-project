import { Component } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialLoginModule, AuthServiceConfig, AuthService } from 'angular-6-social-login';
import {UserService} from './user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ECE9065-Project-Angular';

  constructor(private route: ActivatedRoute,public OAuth: AuthService, private userService:UserService,
    private router: Router) {
}

logout(){
    var user = JSON.parse(localStorage.getItem('socialusers'));
    console.log(user);
    if(user.method && user.method == 'local'){
      localStorage.removeItem("socialusers");
      localStorage.removeItem("userJWTtoken");
      console.log(localStorage.getItem('userJWTtoken'));
      this.router.navigate([``]);  
    }  

    else{
    this.OAuth.signOut().then(data => {  
    localStorage.removeItem("socialusers");
    localStorage.removeItem("userJWTtoken");
    console.log(localStorage.getItem('userJWTtoken'));
    this.router.navigate([``]);  

  }); }
}

getResource(){
  this.userService.getSecret().subscribe(data=>{
    if(data)
    console.log(data);
  });
}
}
