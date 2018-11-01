import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../classes/user';
import { map } from 'rxjs/operators';
import { isNull } from 'util';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: BehaviorSubject<User> = new BehaviorSubject(null);
  constructor(private http: HttpClient) {
    this.init();
    this.getUser().subscribe(user => {
      if (isNull(user)) {
        localStorage.clear();
      } else {
      localStorage.setItem('id', user.id);
      localStorage.setItem('token', user.token);
      localStorage.setItem('email', user.id);
      }
    });
   }
  authEndpoint = 'url';

  signInWithEmail(email: string, password: string) {
    return this.http.post(this.authEndpoint,
    {
      email: email,
      password: password
    }).pipe(map( data => data as User)).subscribe(
      user => {
      this.user.next(user);
    },
      err => {
      console.log('Err', null);
    });
  }

  getUser(): Observable<User> {
    return this.user.asObservable();
  }

  isAuthenticated (): boolean {
    return !isNull(this.user.getValue());
  }

  getToken(): Observable<string> {
    return this.getUser().pipe(map(user => user.token));
  }

  init () {
    const user = new User();
    if (localStorage.length !== 0) {
      user.id = localStorage.getItem('id');
      user.email = localStorage.getItem('email');
      user.token = localStorage.getItem('token');
    }
    this.user.next(user);
  }

  logout() {
    this.user.next(null);
  }
}
