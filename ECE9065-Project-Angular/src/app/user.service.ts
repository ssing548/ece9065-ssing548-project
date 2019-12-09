import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url;
  constructor(private http: HttpClient) { }

  Savesresponse(response)
      {
        this.url =  'http://localhost:3000/auth/oauth/google';
        return this.http.post(this.url,{
          access_token: response.authResponse.accessToken
        });
      }

  
}

