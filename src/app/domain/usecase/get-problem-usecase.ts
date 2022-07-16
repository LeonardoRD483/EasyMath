import { Injectable } from '@angular/core';
import { ProblemGateway } from '../models/problem/gateway/problem-gateway';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { IProblem } from '../models/problem/IProblem';
import { IProblemAnswer } from '../models/problem/IProblemAnswer';

@Injectable({ providedIn: 'root' })
export class GetProblemUsecase {
  constructor(private _problemGateway: ProblemGateway) {}

  getSuccesProblems(level_id:number, answers:IProblemAnswer[]):Observable<HttpResponse<IProblemAnswer[]>>{
    return this._problemGateway.getSuccesProblems(level_id,answers)
  }
  getProblemsByLevel(level_id:number): Observable<HttpResponse<IProblem[]>> {
    return this._problemGateway.getProblemsByLevel(level_id);
  }
}
