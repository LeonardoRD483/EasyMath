import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GetAreaUsecase } from '../../../domain/usecase/get-area-usecase';
import { mergeMap, map, tap } from 'rxjs';
import { getAreas, getAreasSuccess, getAreasEnable, getAreasEnableSuccess } from '../actions/area.actions';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AreaEffects {
  constructor(
    private actions$: Actions,
    private _getAreaUsecase: GetAreaUsecase,
    private _cookieService: CookieService
  ) {}

  getAreas$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAreas),
      mergeMap((action) => {
        return this._getAreaUsecase
          .getAreas()
          .pipe(
            map((resp) => {
              console.log(resp)
              return getAreasSuccess({ areas: resp.body! });
            })
          );
      })
    );
  });

  getAreasSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAreasSuccess),
      tap((action) => {
        this._cookieService.set('areas', JSON.stringify(action.areas), new Date().getDate() + 8, '/')
      })
    );
  }, { dispatch: false });

  getAreasEnable$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAreasEnable),
      mergeMap((action) => {
        return this._getAreaUsecase
          .getAreasEnableByUser()
          .pipe(
            map((resp) => {
              return getAreasEnableSuccess({ areas_enable: resp.body! });
            })
          );
      })
    );
  });

  getAreasEnableSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAreasEnableSuccess),
      tap((action) => {
        this._cookieService.set('areas_enabled', JSON.stringify(action.areas_enable), new Date().getDate() + 8, '/')
      })
    );
  }, { dispatch: false });
}
