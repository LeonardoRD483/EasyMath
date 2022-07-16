import { createAction, props } from '@ngrx/store';
import { IAreas } from '../../../domain/models/area/IArea';
export const getAreas = createAction(
  '[LEVEL] Get Areas',
  props<{ getAreas: boolean }>()
);

export const getAreasEnable = createAction(
  '[LEVEL] Get Areas Enable',
  props<{ getAreasEnable: boolean }>()
);

export const getAreasSuccess = createAction(
  '[LEVEL] Get Areas Success',
  props<{ areas: IAreas }>()
);

export const getAreasEnableSuccess= createAction(
  '[LEVEL] Get Areas Enable Success',
  props<{ areas_enable: IAreas }>()
);


