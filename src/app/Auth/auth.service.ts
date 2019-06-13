import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({providedIn: "root"})
export class AuthService {

  private token : string;
  private isAuthenticated = false;
  private tokenTimer : any;
  private authStatusListener = new Subject<boolean>();

  constructor( private http: HttpClient, private router: Router) {}

  createUser(email:string, password:string) {
    const authData : AuthData = {
      email: email, password: password
    };
    this.http.post('http://localhost:3000/api/user/signup', authData)
    .subscribe(response => {console.log(response);
    });
  }

  login(email: string, password:string) {
    const authData : AuthData = {
      email: email, password: password
    };
    this.http.post<{token:string, expiresIn: number}>('http://localhost:3000/api/user/login', authData)
    .subscribe(response => {
        const token = response.token;
        this.token = token;
        if(token) {
          const expiresIn = response.expiresIn;
          this.setAuthtimer(expiresIn);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationInDate = new Date (now.getTime() + expiresIn * 1000);
          this.saveAuthData(token, expirationInDate);
          this.router.navigate(['/']);
        }
    });
  }

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  private saveAuthData(token : string, expirationInDate: Date){
    localStorage.setItem('token', token);
    localStorage.setItem('expirationInDate', expirationInDate.toISOString());
  }

  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expirationInDate');
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if(!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationInDate.getTime() - now.getTime();
    console.log(authInformation, expiresIn);
    if(expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthtimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationInDate = localStorage.getItem('expirationInDate');
    if(!token || !expirationInDate) {
      return;
    }
    return { token: token, expirationInDate: new Date(expirationInDate)};
  }

  private setAuthtimer(duartion: number) {
    this.tokenTimer = setTimeout(()=> {
      this.logout();
    },duartion * 1000);
  }
}
