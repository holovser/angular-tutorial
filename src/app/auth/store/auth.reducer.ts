import {User} from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User
}


const initialState: State = {
  user: null
}

export function authReducer(state=initialState, action: AuthActions.AuthActions) {
  console.log('Auth Reducer');

  switch (action.type) {

    case AuthActions.LOGIN:
      const newUser = (action as AuthActions.Login).payload;
      return {
        ...state,
        user: newUser
      };

    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }

}
