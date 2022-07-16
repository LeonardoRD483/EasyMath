import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { GetUserUsecase } from '../../../domain/usecase/get-user-usecase';
import { Observable, Subject, throwError } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { IAuthorization } from '../../../domain/models/user/IAuthorization';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private cookieService: CookieService,
    private _getUserUsecase: GetUserUsecase,
    private _router: Router
  ) {}

  isLoggedIn(): Observable<boolean> {
    let valid = new Subject<boolean>();
    this.tokenVerify().subscribe((resp) => {
      if (resp.status == 200) {
        valid.next(true);
      }
    });
    valid.next(false);
    return valid.asObservable();
  }

  tokenVerify(): Observable<HttpResponse<any>> {
    let jwt_string: string = this.cookieService.get('jwt');
    if (jwt_string.length > 0) {
      let jwt: IAuthorization = JSON.parse(jwt_string);
      return this._getUserUsecase.tokenVerify(jwt.access!);
    }
    this.clearCookieJWT();
    this._router.navigateByUrl('/auth/login');
    return throwError('error');
  }

  clearCookieJWT() {
    this.cookieService.deleteAll('/');
  }
}
