import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserGateway } from '../models/user/gateway/user-gateway';
import { IAuthorization } from '../models/user/IAuthorization';
import { ICredentials } from '../models/user/ICredentials';
import { IUser } from '../models/user/IUser';
import { IUserRegister } from '../models/user/IUserRegister';
import { IGenericAnswer } from '../models/IGenericAnswer';

@Injectable({
  providedIn: 'root',
})
export class GetUserUsecase {
  constructor(private _userGateway: UserGateway) {}

  login(credentials: ICredentials): Observable<HttpResponse<IAuthorization>> {
    return this._userGateway.login(credentials);
  }

  register(user: IUserRegister): Observable<HttpResponse<IAuthorization>> {
    return this._userGateway.register(user);
  }

  getUserById(id: number): Observable<HttpResponse<IUser>> {
    return this._userGateway.getUserById(id);
  }

  updateUserById(id: number, user: IUser): Observable<HttpResponse<IUser>> {
    return this._userGateway.updateUserById(id, user);
  }

  tokenVerify(token: string): Observable<HttpResponse<any>> {
    return this._userGateway.tokenVerify(token);
  }

  getScores(): Observable<HttpResponse<any>> {
    return this._userGateway.getScores();
  }
}
