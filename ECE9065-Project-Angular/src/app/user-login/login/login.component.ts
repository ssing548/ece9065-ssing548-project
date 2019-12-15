import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { UserService } from '../../user.service';
import { FacebookLoginProvider, AuthService } from 'angular-6-social-login';  
import { Router } from '@angular/router';  
import { Socialusers } from '../../social-users'  
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService:UserService, private router: Router,public OAuth: AuthService ) { }

  ngOnInit() {
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required,Validators.minLength(3)]);
  socialusers=new Socialusers();
  response;   

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  getPasswordMessage() {
    return this.password.hasError('required') ? 'You must enter a value' :'';
  }


  submit(){
    this.userService.verifyUser(this.email.value,this.password.value).subscribe(data=>{
      if(data){
        var token:string  =  JSON.stringify(data.token);
      
        var user = {
        method:data.user.method,
        userId : data.user._id,
        name:data.user.local.name,
        email:data.user.local.email,
        role:data.user.role,
        status:data.user.status
        }
      
        localStorage.setItem('socialusers', JSON.stringify(user));
        localStorage.setItem('userJWTtoken', token.substring(1,token.length-1)); 
        console.log(localStorage.getItem('socialusers')); 
        if(user.role == "admin"){
          this.router.navigate(['/auth/true/true']);  
        }
        else
        this.router.navigate(['/auth/true/false']);  
       }

    });
  }


  public socialSignIn(socialProvider: string) {  
    let socialPlatformProvider;  
    if (socialProvider === 'facebook') {  
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;  
    } 
      
    this.OAuth.signIn(socialPlatformProvider).then(socialusers => {   
      console.log(localStorage.getItem('socialusers'));
      this.Savesresponse(socialusers);  
    });  
  }  


  Savesresponse(socialusers: Socialusers) {  
    this.userService.Savesresponse(socialusers).subscribe((res: any) => {  
       
      console.log(res);  
      this.socialusers=res;  
  
      this.response = res.userDetail;  
      var user = {
        method:"facebook",
        userId : res.user._id,
        name: res.user.facebook.name,
        email: res.user.facebook.email,
        role:res.user.role,
        status:res.user.status
      }
      console.log(user);
      localStorage.setItem('socialusers', JSON.stringify( user));
      localStorage.setItem('userJWTtoken', JSON.stringify( this.socialusers.token).substring(1,this.socialusers.token.length+1));  
      console.log("###"+localStorage.getItem('userJWTtoken')); 
      console.log("###"+localStorage.getItem('socialusers')); 
      if(user.role == "admin"){
        this.router.navigate(['/auth/true/true']);  
      }
      else
      this.router.navigate(['/auth/true/false']);  
     
    })  
  }  
}
