import { HttpResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILevels } from 'src/app/domain/models/level/ILevels';
import { LevelGateway } from '../../../domain/models/level/gateway/level-gateway';

@Injectable({
  providedIn: 'root',
})
export class LevelService extends LevelGateway {
  getLevelsByArea(area: number): Observable<HttpResponse<ILevels>> {
    return this._http.get(
      `http://127.0.0.1:8000/api/game/level/get_levels_by_area/?area=${area}`,
      { observe: 'response' }
    );
  }
  getLevelsEnableByUserAndArea(
    area: number
  ): Observable<HttpResponse<ILevels>> {
    return this._http.get(
      `http://127.0.0.1:8000/api/game/level/get_levels_enable_by_user_and_area/?area=${area}`,
      { observe: 'response' }
    );
  }

  constructor(private _http: HttpClient) {
    super();
  }
}
