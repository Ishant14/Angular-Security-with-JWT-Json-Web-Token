import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class AuthService {
  constructor(public jwtHelper: JwtHelperService,private http:HttpClient) {}
  
  
  public isAuthenticated(): boolean {
    const token = sessionStorage.getItem('AuthToken');
    // Check whether the token is expired and return
    // true or false
    console.log("Session token :"+token);
    const decodeToken = this.jwtHelper.decodeToken(token);
    console.log("Decoded token :"+ this.jwtHelper.decodeToken(token));
    console.log("Token expired : "+ this.jwtHelper.isTokenExpired(token));

    return !this.jwtHelper.isTokenExpired(token);
     
  }

  attemptAuth(ussername: string, password: string): Observable<any> {
    const credentials = {username: ussername, password: password,role:'admin'};
    console.log('attempAuth ::');
    return this.http.post('http://localhost:8081/token', credentials);
  }

  signOut() {
    window.sessionStorage.removeItem('AuthToken');
    window.sessionStorage.clear();
  }

}