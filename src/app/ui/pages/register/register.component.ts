import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GetUserUsecase } from 'src/app/domain/usecase/get-user-usecase';
import { IUserRegister } from '../../../domain/models/user/IUserRegister';
import { PopUpRegisterComponent } from '../../components/pop-up-register/pop-up-register.component';

export interface ISchool {
  name?: string;
  cod?: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm?: FormGroup;
  schools?: ISchool[];
  constructor(
    private _fb: FormBuilder,
    private _getUserUsecase: GetUserUsecase,
    private popup: MatDialog
  ) {
    this.schools = [
      { name: 'Buenas Nuevas', cod: 'BN' },
      { name: 'Don Bosco', cod: 'DB' },
      { name: 'La Salle', cod: 'LS' },
      { name: 'Marista', cod: 'MR' },
      { name: 'San Agustin', cod: 'SA' },
      { name: 'San George', cod: 'SG' },
    ];
  }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this._fb.group({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      school: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      repeat_password: new FormControl('', [
        Validators.required,
        this.checkPassword(),
      ]),
    });
  }

  checkPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      return this.registerForm?.get('password')?.value == value
        ? null
        : { repeatPassword: true };
    };
  }

  register() {
    let user: IUserRegister = {
      first_name: this.registerForm?.get('first_name')?.value,
      last_name: this.registerForm?.get('last_name')?.value,
      username: this.registerForm?.get('username')?.value,
      email: this.registerForm?.get('email')?.value,
      password: this.registerForm?.get('password')?.value,
      school: this.registerForm?.get('school')?.value,
    };

    this._getUserUsecase.register(user).subscribe((resp) => {

      this.successRegister()
    });
  }

  successRegister(): void {
    this.popup.open(PopUpRegisterComponent, { disableClose: true, width: "300px" });
  }
}
