import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs';
import { GetUserUsecase } from 'src/app/domain/usecase/get-user-usecase';
import {
  userLogin,
  userLoginSuccess,
  loadUser,
} from '../actions/usuario.actions';
import { IAuthorization } from '../../../domain/models/user/IAuthorization';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { IUser } from '../../../domain/models/user/IUser';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private _getUserUsecase: GetUserUsecase,
    private _router: Router,
    private _cookieService: CookieService
  ) {}

  userLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userLogin),
      mergeMap((action) => {
        return this._getUserUsecase
          .login({
            email: action.credentials.email,
            password: action.credentials.password,
          })
          .pipe(
            map((resp) => {
              let auth: IAuthorization = {
                access: resp.body?.access,
                refresh: resp.body?.refresh,
              };
              this._cookieService.set('jwt', JSON.stringify(auth), new Date().getDate() + 7,'/');
              return userLoginSuccess({ auth: auth });
            })
          );
      })
    );
  });

  userLoginSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userLoginSuccess),
      map((action) => {
        let user: IUser = jwt_decode(action.auth.access!);
        return loadUser({ user: user });
      })
    );
  });

  loadUser$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadUser),
        tap((action) => {
          this._cookieService.set('user', JSON.stringify(action.user), new Date().getDate() + 7,'/');
          this._router.navigateByUrl('student/area');
        })
      );
    },
    { dispatch: false }
  );
}
