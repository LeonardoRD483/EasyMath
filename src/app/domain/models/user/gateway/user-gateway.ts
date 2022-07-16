import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAuthorization } from '../IAuthorization';
import { ICredentials } from '../ICredentials';
import { IUserRegister } from '../IUserRegister';
import { IUser } from '../IUser';
import { IGenericAnswer } from '../../IGenericAnswer';

export abstract class UserGateway {
  abstract login(
    credentials: ICredentials
  ): Observable<HttpResponse<IAuthorization>>;
  abstract register(
    user: IUserRegister
  ): Observable<HttpResponse<IAuthorization>>;
  abstract getUserById(id: number): Observable<HttpResponse<IUser>>;
  abstract updateUserById(
    id: number,
    user: IUser
  ): Observable<HttpResponse<IUser>>;
  abstract tokenVerify(token: string): Observable<HttpResponse<any>>;

  abstract getScores(): Observable<HttpResponse<any>>;
}
