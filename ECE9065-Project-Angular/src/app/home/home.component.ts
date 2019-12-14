import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angular-6-social-login';  
import { SocialLoginModule, AuthServiceConfig } from 'angular-6-social-login';  
import { Socialusers } from '../social-users'  
//import { SocialloginService } from '../Service/sociallogin.service';  
import { Router, ActivatedRoute, Params } from '@angular/router';  
import { stringify } from 'querystring';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  email:string;
  password:string;

  response;  
  socialusers=new Socialusers();  
constructor(  
  public OAuth: AuthService,  
  private Userservice:UserService,  
  private router: Router  
) { }  
public socialSignIn(socialProvider: string) {  
  let socialPlatformProvider;  
  if (socialProvider === 'facebook') {  
    socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;  
  } else if (socialProvider === 'google') {  
    socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;  
  } 
    
  console.log(socialPlatformProvider);
  this.OAuth.signIn(socialPlatformProvider).then(socialusers => {  
    console.log(socialProvider);  
    console.log(socialusers);  
    var user = {
      method:"facebook",
      name:socialusers.name,
      email:socialusers.email
    }
    localStorage.setItem('socialusers', JSON.stringify( user));  
    console.log(localStorage.getItem('socialusers'));
    this.Savesresponse(socialusers);  
  });  
}  
Savesresponse(socialusers: Socialusers) {  
  this.Userservice.Savesresponse(socialusers).subscribe((res: any) => {  
     
    console.log(res);  
    this.socialusers=res;  

    this.response = res.userDetail;  
    localStorage.setItem('userJWTtoken', JSON.stringify( this.socialusers.token).substring(1,this.socialusers.token.length+1));  
    console.log("###"+localStorage.getItem('userJWTtoken')); 
    this.router.navigate([`/auth/true`]);  
  })  
}  

  ngOnInit() {
  }

  submit(){
    this.Userservice.verifyUser(this.email,this.password).subscribe(data=>{
      if(data){
        var token:string  =  JSON.stringify(data.token);
        // interface userObj {
        //   method:string,
        //   local:{
        //     email:string,
        //     password:string,
        //     name:string
        //   },
        //   _id:string
        // }
var user = {
  method:data.user.method,
  name:data.user.local.name,
  email:data.user.local.email
}
        //var user:userObj  = data.user;
      //  var user = data.user;
        console.log(user);
       // let obj: MyObj = JSON.parse('{ "myString": "string", "myNumber": 4 }');
  
        localStorage.setItem('socialusers', JSON.stringify(user));
        localStorage.setItem('userJWTtoken', token.substring(1,token.length-1)); 
        console.log(localStorage.getItem('socialusers')); 
        console.log(localStorage.getItem('userJWTtoken')); 
        this.router.navigate([`/auth/true`]);  
      }

    });
  }


}
