import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest ,HttpResponse } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient) { }

 registerUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post('users/register', user,{headers: headers, observe: 'response'}).pipe(map((res: HttpResponse<JSON>) => res));
  }

  authenticateUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post('users/authenticate', user,{headers: headers, observe: 'response'}).pipe(map((res: HttpResponse<JSON>) => res));
  }

  getProfile() {
    this.loadToken();
    let headers = new HttpHeaders();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('users/profile',{headers: headers}).pipe(map((res: HttpResponse<JSON>) => res));
  }

  // getProfile(): Observable<User[]> {
  //   this.loadToken();
  //   let headers = new HttpHeaders();
  //   headers.append('Authorization', this.authToken);
  //   headers.append('Content-Type','application/json');
  //   return this.http.get<any>('http://localhost:3000/users/profile',{headers: headers});
  // }


  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    const token: any = localStorage.getItem('id_token');
    if (token == null || token == undefined) {
      return false;
    } else {
      return true;
    }
    //return this.jwtHelper.isTokenExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  // registerUser(user) {
  //   let headers = new HttpHeaders();
  //   headers.append('Content-Type','application/json');
  //   return this.http.post('http://localhost:3000/users/register', user,{headers: headers}).pipe(map((res: any) => res.json()));
  // }

}
