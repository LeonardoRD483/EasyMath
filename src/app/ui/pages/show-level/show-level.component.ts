import { Component, OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../../../infraestructure/store/app.reducers';
import { CookieService } from 'ngx-cookie-service';
import {
  getProblems,
  getProblemsSuccess,
} from '../../../infraestructure/store/actions/problem.action';
import { IProblem, Fields } from '../../../domain/models/problem/IProblem';
import { IProblemAnswer } from '../../../domain/models/problem/IProblemAnswer';
import { ActivatedRoute } from '@angular/router';
import { saveProblemsAnswer } from '../../../infraestructure/store/actions/problem.action';
import { GetProblemUsecase } from '../../../domain/usecase/get-problem-usecase';
import { map } from 'rxjs';

@Component({
  selector: 'app-show-level',
  templateUrl: './show-level.component.html',
  styleUrls: ['./show-level.component.scss'],
})
export class ShowLevelComponent implements OnInit {
  problems?: IProblem[];
  answer?: IProblemAnswer[] = [];
  level_id?: number;
  disabled?: boolean = true;
  constructor(
    private _store: Store<AppState>,
    private _actions$: Actions,
    private _cookieService: CookieService,
    private _route: ActivatedRoute,
    private _getProblemUsecase: GetProblemUsecase
  ) {}

  ngOnInit(): void {
    this.getProblems();
  }

  getProblems() {
    this._route.params.subscribe((params) => {
      this.level_id = params['level'];
      this._store.dispatch(getProblems({ level: this.level_id! }));
      this._actions$.pipe(ofType(getProblemsSuccess)).subscribe((resp) => {
        this.buildProblems();
      });
    });
  }

  buildProblems() {
    this.problems = JSON.parse(this._cookieService.get('problems'));
  }

  getResponse(problemAnswer: IProblemAnswer) {
    this.answer?.push(problemAnswer);
    let edit = this.problems?.filter((problem) => {
      return problem.pk == problemAnswer.pk;
    })[0];
    edit!.fields!.problem_answer = problemAnswer;
    this._store.dispatch(
      saveProblemsAnswer({ id: edit?.pk!, problem_fields: edit?.fields! })
    );
    if (this.answer?.length == this.problems?.length) {
      this.disabled = false;
    }
  }

  sendAnswer() {
    this._getProblemUsecase.getSuccesProblems(this.level_id!,this.answer!, ).subscribe((resp)=>{
      let answer_success = resp.body?.map((answer) =>{
        return answer.pk
      })

      this.problems?.forEach(element => {
        if(answer_success?.includes(element.pk)){
          element.check = 1
        }else{
          element.check = 2
        }
      });
      this.disabled = true;
    })
  }
}
