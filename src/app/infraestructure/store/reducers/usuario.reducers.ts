import { createReducer, on } from '@ngrx/store';
import { ICredentials } from '../../../domain/models/user/ICredentials';
import { IAuthorization } from '../../../domain/models/user/IAuthorization';
import { IUser } from '../../../domain/models/user/IUser';
import {
  userLogin,
  loadUser,
  userLoginSuccess,
} from '../actions/usuario.actions';

export interface UserState {
  user: IUser | null;
  credentials: ICredentials | null;
  authorization: IAuthorization | null;
  loaded: boolean;
  error: any;
}

export const userInitialState: UserState = {
  user: null,
  credentials: null,
  authorization: null,
  loaded: false,
  error: null,
};

export const _userReducer = createReducer(
  userInitialState,

  on(userLogin, (state, { credentials }) => ({
    ...state,
    credentials: { ...credentials },
  })),
  on(userLoginSuccess, (state, { auth }) => ({
    ...state,
    loaded: true,
    authorization: { ...auth },
  })),
  on(loadUser, (state, { user }) => ({
    ...state,
    user: { ...user },
  }))
);
