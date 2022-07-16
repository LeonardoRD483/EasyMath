import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { IProblem } from '../IProblem';
import { IProblemAnswer } from '../IProblemAnswer';
export abstract class ProblemGateway {
  abstract getProblemsByLevel(level_id:number): Observable<HttpResponse<IProblem[]>>;

  abstract getSuccesProblems(level_id:number, answers: IProblemAnswer[]):Observable<HttpResponse<IProblemAnswer[]>>
}
