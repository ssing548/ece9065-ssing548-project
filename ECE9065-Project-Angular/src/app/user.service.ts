import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url;
  getSecret() {
    this.url = 'http://localhost:3000/auth/secret';
    return this.http.get(this.url);
  }
 
  
  constructor(private http: HttpClient) { }

  Savesresponse(response)
      {
        this.url =  'http://localhost:3000/auth/oauth/facebook';
        return this.http.post(this.url,{
          "access_token": response.token
        });
      }

      verifyUser(email: string, password: string):Observable<any>  {
        this.url = 'http://localhost:3000/auth/signin';
        return this.http.post(this.url,{
          "email": email,
          "password":password
        });
      }
    
      
  

  
}

