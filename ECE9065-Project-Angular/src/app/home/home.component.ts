import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angular-6-social-login';  
import { SocialLoginModule, AuthServiceConfig } from 'angular-6-social-login';  
import { Socialusers } from '../social-users'  
//import { SocialloginService } from '../Service/sociallogin.service';  
import { Router, ActivatedRoute, Params } from '@angular/router';  
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  email:String;
  password:String;

  response;  
  socialusers=new Socialusers();  
constructor(  
  public OAuth: AuthService,  
  private Userservice:UserService,  
  private router: Router  
) { }  
public socialSignIn(socialProvider: string) {  

  
let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;  
  console.log(socialPlatformProvider);
  this.OAuth.signIn(socialPlatformProvider).then(socialusers => {  
    console.log(socialProvider);  
    console.log(socialusers);  
    this.Savesresponse(socialusers);  
  });  
}  
Savesresponse(socialusers: Socialusers) {  
  this.Userservice.Savesresponse(socialusers).subscribe((res: any) => {  
    debugger;  
    console.log(res);  
    this.socialusers=res;  

    this.response = res.userDetail;  
    localStorage.setItem('socialusers', JSON.stringify( this.socialusers));  
    console.log(localStorage.setItem('socialusers', JSON.stringify(this.socialusers)));  
    this.router.navigate([`/auth`]);  
  })  
}  

  ngOnInit() {
  }

  submit(){
    
  }


}
