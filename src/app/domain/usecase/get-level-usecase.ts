import { Injectable } from '@angular/core';
import { LevelGateway } from '../models/level/gateway/level-gateway';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ILevels } from '../models/level/ILevels';

@Injectable({ providedIn: 'root' })
export class GetLevelUsecase {
  constructor(private _levelGateway: LevelGateway) {}

  getLevelsByArea(area: number): Observable<HttpResponse<ILevels>> {
    return this._levelGateway.getLevelsByArea(area);
  }
  getLevelsEnableByUserAndArea(
    area: number
  ): Observable<HttpResponse<ILevels>> {
    return this._levelGateway.getLevelsEnableByUserAndArea(area);
  }
}
