import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { GetUserUsecase } from 'src/app/domain/usecase/get-user-usecase';
import { ICredentials } from '../../../domain/models/user/ICredentials';
import { HttpResponse } from '@angular/common/http';
import { IAuthorization } from '../../../domain/models/user/IAuthorization';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../infraestructure/store/app.reducers';
import { userLogin } from '../../../infraestructure/store/actions/usuario.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm?: FormGroup;
  isSuccess?: boolean = true;

  constructor(
    private _fb: FormBuilder,
    private _cookieService: CookieService,
    private _router: Router,
    private _store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this._fb.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.minLength(6),
        Validators.required,
      ]),
    });
  }

  login() {
    let credentials: ICredentials = {
      email: this.loginForm?.get('email')?.value,
      password: this.loginForm?.get('password')?.value,
    };

    this._store.dispatch(userLogin({credentials:credentials}))
  }

  resetInputs() {
    this.isSuccess = false;
    this.loginForm?.reset();
    document.getElementById('email')?.focus();
    this._cookieService.deleteAll('auth')
  }


}
