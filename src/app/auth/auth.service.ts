import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, Subject, throwError} from 'rxjs';
import {User} from './user.model';
import {Data, Router} from '@angular/router';
import { environment} from '../../environments/environment';

export interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}


@Injectable({providedIn: 'root'})
export class AuthService implements OnInit{

  userSubject = new BehaviorSubject<User>(null);
  token: string = null;
  tokeExpirationTimer: any;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  ngOnInit(): void {
  }



  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?' +
      'key=' + environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
      ).pipe(
        catchError(this.handleError),
        tap(
          responseData => {
            this.handleAuthentication(
              responseData.email,
              responseData.localId,
              responseData.idToken,
              +responseData.expiresIn
            );
          }
        )
      );

  }

  login(email: string, password: string ) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?' +
      'key=' + environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true})
      .pipe(
        catchError(this.handleError),
        tap(
          responseData => {
            this.handleAuthentication(
              responseData.email,
              responseData.localId,
              responseData.idToken,
              +responseData.expiresIn
            );
          }
        )
      );
  }

  logout() {
    this.userSubject.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);

    if ( this.tokeExpirationTimer ) {
      clearTimeout(this.tokeExpirationTimer);
    }
    this.tokeExpirationTimer = null;

  }

  autoLogout(expirationDuration: number) {
    this.tokeExpirationTimer = setTimeout( this.logout.bind(this), expirationDuration);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';

    if ( !errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch(errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exists';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct'
        break;
    }
    return throwError(errorMessage);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

    const user = new User(email, userId, token, expirationDate);
    this.userSubject.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  autoLogin() {
    const userData: {email: string, id: string, _token: string, _tokenExpirationDate: string}
    = JSON.parse(localStorage.getItem('userData'));
    if ( !userData ) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if ( loadedUser.token ) {
      this.userSubject.next(loadedUser);

      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

}
