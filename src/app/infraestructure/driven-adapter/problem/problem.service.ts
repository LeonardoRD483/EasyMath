import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ProblemGateway } from '../../../domain/models/problem/gateway/problem-gateway';
import { Observable } from 'rxjs';
import { IProblem } from 'src/app/domain/models/problem/IProblem';
import { IProblemAnswer } from 'src/app/domain/models/problem/IProblemAnswer';

@Injectable({
  providedIn: 'root',
})
export class ProblemService extends ProblemGateway {
  getSuccesProblems(
    level_id: number,
    answers: IProblemAnswer[]
  ): Observable<HttpResponse<IProblemAnswer[]>> {
    return this._http.post<IProblemAnswer[]>(
      `http://127.0.0.1:8000/api/game/problem/get_success_problems_by_level_and_user/?level=${level_id}`,
      {answers:answers},
      { observe: 'response' }
    );
  }
  getProblemsByLevel(level_id: number): Observable<HttpResponse<IProblem[]>> {
    return this._http.get<IProblem[]>(
      `http://127.0.0.1:8000/api/game/problem/get_problems_by_level/?level=${level_id}`,
      {
        observe: 'response',
      }
    );
  }
  constructor(private _http: HttpClient) {
    super();
  }
}
