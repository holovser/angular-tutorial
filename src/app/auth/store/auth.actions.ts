import {Action} from '@ngrx/store';
import {User} from '../user.model';

export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';
export const LOGIN_START = '[Auth] Login Start';


export class Login implements Action{
  readonly type: string = LOGIN;

  constructor(public payload: User) {
  }
}

export class Logout implements Action {
  readonly type: string = LOGOUT;

}

export type AuthActions = Login | Logout;
