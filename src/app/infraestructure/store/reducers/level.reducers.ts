import { ILevels, Level } from '../../../domain/models/level/ILevels';
import { createReducer, on } from '@ngrx/store';
import { getLevelsEnableSuccess } from '../actions/level.actions';
import {
  getLevels,
  getLevelsSuccess,
  getLevelsEnable,
} from '../actions/level.actions';


export interface Levels{
  suma: Level[];

}

export interface LevelState {
  area: number | null;
  levels: ILevels | null;
  levels_enable: ILevels | null;
}

export const levelInitialState: LevelState = {
  area: null,
  levels: null,
  levels_enable: null,
};

export const _levelReducer = createReducer(
  levelInitialState,

  on(getLevels, (state, { area }) => ({
    ...state,
    area: area,
  })),
  on(getLevelsSuccess, (state, { levels }) => ({
    ...state,
    levels: { ...levels },
  })),
  on(getLevelsEnable, (state, { area }) => ({
    ...state,
    area: area,
  })),
  on(getLevelsEnableSuccess, (state, { levels_enable }) => ({
    ...state,
    levels_enable: {...levels_enable},
  }))
);
