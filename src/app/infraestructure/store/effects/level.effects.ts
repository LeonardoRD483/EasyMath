import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { getLevels, getLevelsSuccess, getLevelsEnable, getLevelsEnableSuccess } from '../actions/level.actions';
import { mergeMap, map, tap } from 'rxjs';
import { GetLevelUsecase } from 'src/app/domain/usecase/get-level-usecase';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class LevelEffects {
  constructor(
    private actions$: Actions,
    private _getLevelUsecase: GetLevelUsecase,
    private _cookieService: CookieService,
  ) {}

  getLevels$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getLevels),
      mergeMap((action) => {
        return this._getLevelUsecase
          .getLevelsByArea(action.area)
          .pipe(
            map((resp) => {
              return getLevelsSuccess({ levels: resp.body! });
            })
          );
      })
    );
  });

  getLevelsSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getLevelsSuccess),
      tap((action) => {
        this._cookieService.set('levels', JSON.stringify(action.levels.levels), new Date().getDate() + 8, '/')
      })
    );
  },{dispatch: false});

  getLevelsEnable$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getLevelsEnable),
      mergeMap((action) => {
        return this._getLevelUsecase
          .getLevelsEnableByUserAndArea(action.area)
          .pipe(
            map((resp) => {
              return getLevelsEnableSuccess({ levels_enable: resp.body! });
            })
          );
      })
    );
  });

  getLevelsEnableSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getLevelsEnableSuccess),
      tap((action) => {
        this._cookieService.set('levels_enable', JSON.stringify(action.levels_enable.levels), new Date().getDate() + 8, '/')
      })
    );
  },{dispatch: false});
}
