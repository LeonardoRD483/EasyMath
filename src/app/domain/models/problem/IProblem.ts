import { IProblemAnswer } from './IProblemAnswer';
export interface IProblem {
  model?:  string;
  pk?:     number;
  fields?: Fields;
  check?: number;
}

export interface Fields {
  question?:  string;
  operation?: string;
  numbers?:   string;
  result?:    number;
  level?:     number;
  problem_answer ?: IProblemAnswer | null;
}
