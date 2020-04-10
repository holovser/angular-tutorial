import {User} from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User,
  authError: string,
  loading: boolean
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false
};

export function authReducer(state=initialState, action: AuthActions.AuthActions) {
  console.log('Auth Reducer');

  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      const newUser = (action as AuthActions.AuthenticateSuccess).payload;
      return {
        ...state,
        authError: null,
        user: newUser,
        loading: false
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      };
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        authError: null,
        loading: true
      };
    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: (action as AuthActions.AuthenticateFail).payload,
        loading: false
      };
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null
      };
    default:
      return state;
  }

}
