import { UserState } from './reducers/usuario.reducers';
import { LevelState } from './reducers/level.reducers';
import { AreaState } from './reducers/area.reducers';
import { ProblemState } from './reducers/problem.reducers';
export interface AppState {
  user: UserState;
  levels: LevelState;
  areas: AreaState;
  problems: ProblemState
}
