import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GetProblemUsecase } from '../../../domain/usecase/get-problem-usecase';
import { CookieService } from 'ngx-cookie-service';
import { mergeMap, map, tap } from 'rxjs';
import { getProblems, getProblemsSuccess, saveProblemsAnswer } from '../actions/problem.action';

@Injectable()
export class ProblemEffects {
  constructor(
    private actions$: Actions,
    private _getProblemUsecase: GetProblemUsecase,
    private _cookieService: CookieService
  ) {}

  getLevels$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getProblems),
      mergeMap((action) => {
        return this._getProblemUsecase.getProblemsByLevel(action.level).pipe(
          map((resp) => {
            return getProblemsSuccess({ problems: resp.body!.map((level)=>{
              level.check = 0
              return level
            }) });
          })
        );
      })
    );
  });

  getLevelsSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(getProblemsSuccess),
        tap((action) => {
          this._cookieService.set(
            'problems',
            JSON.stringify(action.problems),
            new Date().getDate() + 8,
            '/'
          );
        })
      );
    },
    { dispatch: false }
  );

  saveProblemAnswer$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(saveProblemsAnswer),
        tap((action) => {
          console.log(action)
        })
      );
    },
    { dispatch: false }
  );
}
