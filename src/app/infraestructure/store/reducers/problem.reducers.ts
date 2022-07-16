import { IProblem } from '../../../domain/models/problem/IProblem';
import { on, createReducer } from '@ngrx/store';
import {
  getProblems,
  getProblemsSuccess,
  saveProblemsAnswer,
} from '../actions/problem.action';

export interface ProblemState {
  level: number | null;
  problems: IProblem[] | null;
}

export const levelInitialState: ProblemState = {
  level: null,
  problems: null,
};

export const _problemReducer = createReducer(
  levelInitialState,

  on(getProblems, (state, { level }) => ({
    ...state,
    level: level,
  })),
  on(getProblemsSuccess, (state, { problems }) => ({
    ...state,
    problems: problems,
  })),

  on(saveProblemsAnswer, (state, { id, problem_fields }) => ({
    ...state,
    problems: [
      {
        ...state.problems![id - 1],
        fields: problem_fields,
      },
    ],
  }))
);
