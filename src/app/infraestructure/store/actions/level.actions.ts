import { createAction, props } from '@ngrx/store';
import { ILevels } from '../../../domain/models/level/ILevels';
import { IAreas } from '../../../domain/models/area/IArea';

export const getLevels = createAction(
  '[LEVEL] Get Levels',
  props<{ area: number }>()
);

export const getLevelsEnable = createAction(
  '[LEVEL] Get Levels Enable',
  props<{ area: number }>()
);

export const getLevelsSuccess = createAction(
  '[LEVEL] Get Level Success',
  props<{ levels: ILevels }>()
);

export const getLevelsEnableSuccess = createAction(
  '[LEVEL] Get Level Enable Success',
  props<{ levels_enable: ILevels }>()
);
