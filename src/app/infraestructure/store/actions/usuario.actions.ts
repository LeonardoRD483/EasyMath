import {createAction, props} from '@ngrx/store'
import { ICredentials } from '../../../domain/models/user/ICredentials';
import { IAuthorization } from '../../../domain/models/user/IAuthorization';
import { IUser } from '../../../domain/models/user/IUser';


export const loadUser = createAction(
  '[USER] Load User',
  props<{user: IUser}>()
);
export const userLogin = createAction(
  '[USER] User Login',
  props<{credentials: ICredentials}>()
);
export const userLoginSuccess = createAction(
  '[USER] User Login Success',
  props<{auth: IAuthorization}>()
);


