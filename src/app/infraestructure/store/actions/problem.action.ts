import { createAction, props } from '@ngrx/store';
import { IProblem, Fields } from '../../../domain/models/problem/IProblem';
import { IProblemAnswer } from '../../../domain/models/problem/IProblemAnswer';

export const getProblems = createAction(
  '[LEVEL] Get Problems',
  props<{ level: number }>()
);

export const getProblemsSuccess = createAction(
  '[LEVEL] Get Problems Success',
  props<{ problems: IProblem[] }>()
);

export const saveProblemsAnswer = createAction(
  '[Problem Answer] Save Problem Answer',
  props<{id:number, problem_fields: Fields }>()
);
