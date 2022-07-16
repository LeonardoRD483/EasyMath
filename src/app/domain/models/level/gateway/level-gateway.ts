import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ILevels } from '../ILevels';
export abstract class LevelGateway {
  abstract getLevelsByArea(area:number): Observable<HttpResponse<ILevels>>;
  abstract getLevelsEnableByUserAndArea(area:number): Observable<HttpResponse<ILevels>>;
}
