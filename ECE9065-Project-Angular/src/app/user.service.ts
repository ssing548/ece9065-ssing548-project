import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { IApplicationUser } from './application-users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  toggleStatus(action: string, user: IApplicationUser) :Observable<any>  {
    var data = {
      "status": action,
      "user":user
    };
    console.log(data);
    return this.http.post('http://localhost:3000/auth/user/changeStatus',data, { observe: 'response' });
}

toggleAccess(action: string, user: IApplicationUser) :Observable<any>  {
  var data = {
    "role": action,
    "user":user
  };
  console.log(data);
  return this.http.post('http://localhost:3000/auth/user/changeRole',data, { observe: 'response' });
}
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
        },{observe:'response'});
      }
    
      
      getAllUsers():Observable<any> {
        return this.http.get<any>('http://localhost:3000/auth/getusers')
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data)))
       
      );
        
}

  userSignup(name:string,email:string,password:string):Observable<any> {
    this.url = 'http://localhost:3000/auth/signup';
    return this.http.put(this.url,{
      "name": name,
      "email": email,
      "password":password
    },{observe:'response'});

  } 

  
}

