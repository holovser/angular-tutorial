import {Injectable, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

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

  // userSubject = new BehaviorSubject<User>(null);
  token: string = null;
  tokeExpirationTimer: any;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
  }

  setLogoutTimer(expirationDuration: number) {
    this.tokeExpirationTimer = setTimeout( () => {
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if ( this.tokeExpirationTimer) {
      clearTimeout();
      this.tokeExpirationTimer = null;
    }
  }




}
