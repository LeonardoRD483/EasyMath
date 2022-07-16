import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserGateway } from 'src/app/domain/models/user/gateway/user-gateway';
import { IGenericAnswer } from 'src/app/domain/models/IGenericAnswer';
import { IUser } from 'src/app/domain/models/user/IUser';
import { ICredentials } from 'src/app/domain/models/user/ICredentials';
import { IAuthorization } from 'src/app/domain/models/user/IAuthorization';
import { IUserRegister } from 'src/app/domain/models/user/IUserRegister';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService extends UserGateway {

  getScores(): Observable<HttpResponse<any>> {
    return this._http.get(`${environment.base_url}/api/userapp/user/get_score/`,{observe:'response'})
  }
  tokenVerify(token: string): Observable<HttpResponse<any>> {
    return this._http.post(
      `${environment.base_url}/api/userapp/token/verify/`,
      { token: token },
      { observe: 'response', headers: { skip: 'true' } }
    );
  }
  updateUserById(id: number, user: IUser): Observable<HttpResponse<IUser>> {
    return this._http.patch(
      `${environment.base_url}/api/userapp/user/${id}/`,
      user,
      { observe: 'response' }
    );
  }
  getUserById(id: number): Observable<HttpResponse<IUser>> {
    return this._http.get(`${environment.base_url}/api/userapp/user/${id}/`, {
      observe: 'response',
    });
  }

  login(credentials: ICredentials): Observable<HttpResponse<IAuthorization>> {
    return this._http.post(
      `${environment.base_url}/api/userapp/login/token/`,
      credentials,
      { observe: 'response', headers: { skip: 'true' } }
    );
  }

  register(user: IUserRegister): Observable<HttpResponse<IAuthorization>> {
    return this._http.post(`${environment.base_url}/api/userapp/user/`, user, {
      observe: 'response',
      headers: { skip: 'true' },
    });
  }

  constructor(private _http: HttpClient) {
    super();
  }
}
