import { IAreas, Area } from '../../../domain/models/area/IArea';
import { createReducer, on } from '@ngrx/store';
import { getAreas, getAreasSuccess, getAreasEnable, getAreasEnableSuccess } from '../actions/area.actions';
export interface Areas{
  suma: Area;
  resta: Area;
  multiplicacion: Area
  division: Area
  potencia: Area
}
export interface AreaState {
  getAreas: boolean;
  getAreasEnable: boolean;
  areas_enable: IAreas | null;
  areas: IAreas | null;
}

export const levelInitialState: AreaState = {
  getAreas: false,
  getAreasEnable: false,
  areas_enable: null,
  areas: null

};

export const _areaReducer = createReducer(
  levelInitialState,

  on(getAreas, (state, { getAreas }) => ({
    ...state,
    getAreas: getAreas ,
  })),
  on(getAreasEnable, (state, { getAreasEnable }) => ({
    ...state,
    getAreasEnable: getAreasEnable ,
  })),
  on(getAreasSuccess, (state, { areas }) => ({
    ...state,
    areas: { ...areas },
  })),
  on(getAreasEnableSuccess, (state, { areas_enable }) => ({
    ...state,
    areas_enable: { ...areas_enable },
  })),
);
