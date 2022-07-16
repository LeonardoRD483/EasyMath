import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { IAreas } from '../IArea';
export abstract class AreaGateway {
  abstract getAreas():Observable<HttpResponse<IAreas>>
  abstract getAreasEnableByUser():Observable<HttpResponse<IAreas>>
}
