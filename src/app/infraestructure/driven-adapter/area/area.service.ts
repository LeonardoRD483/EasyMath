import { HttpResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AreaGateway } from 'src/app/domain/models/area/gateway/area-gateway';
import { IAreas } from 'src/app/domain/models/area/IArea';

@Injectable({
  providedIn: 'root',
})
export class AreaService extends AreaGateway {
  getAreas(): Observable<HttpResponse<IAreas>> {
    return this._http.get(
      `http://127.0.0.1:8000/api/game/area/`,
      { observe: 'response' }
    );
  }
  getAreasEnableByUser(): Observable<HttpResponse<IAreas>> {
    return this._http.get(
      `http://127.0.0.1:8000/api/game/area/get_areas_enable_by_user/`,
      { observe: 'response' }
    );
  }

  constructor(private _http: HttpClient) {
    super();
  }
}
