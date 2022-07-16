import { Injectable } from '@angular/core';
import { AreaGateway } from '../models/area/gateway/area-gateway';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { IAreas } from '../models/area/IArea';

@Injectable({ providedIn: 'root' })
export class GetAreaUsecase {
  constructor(private _areaGateway: AreaGateway) {}

  getAreas(): Observable<HttpResponse<IAreas>> {
    return this._areaGateway.getAreas();
  }
  getAreasEnableByUser(): Observable<HttpResponse<IAreas>> {
    return this._areaGateway.getAreasEnableByUser();
  }
}
