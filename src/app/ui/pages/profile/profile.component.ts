import { Component, OnInit } from '@angular/core';
import { GetUserUsecase } from '../../../domain/usecase/get-user-usecase';
import { IUser } from '../../../domain/models/user/IUser';
import { ISchool } from '../register/register.component';
import { MatDialog } from '@angular/material/dialog';
import { PopUpGenericMessageComponent } from '../../components/pop-up-generic-message/pop-up-generic-message.component';
import { CookieService } from 'ngx-cookie-service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user?: IUser;
  profileForm?: FormGroup;
  schools?: ISchool[];
  constructor(
    private _getUserUsecase: GetUserUsecase,
    private _fb: FormBuilder,
    private popup: MatDialog,
    private _cookieService: CookieService
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
    this.createProfileForm();
    this.getUserById();
  }

  createProfileForm() {
    this.profileForm = this._fb.group({
      first_name: new FormControl(),
      last_name: new FormControl(),
      email: new FormControl(),
      username: new FormControl(),
      school: new FormControl(),
    });

    this.profileForm.get('username')?.disable();
    this.profileForm.get('email')?.disable();
  }

  getUserById() {
    let user : IUser = JSON.parse(this._cookieService.get('user'))

    this._getUserUsecase.getUserById(user.user_id!).subscribe((resp) => {
      this.user = resp.body!;
      this.profileForm?.setValue(this.user);
    });
  }

  updateUserById() {
    let user : IUser = JSON.parse(this._cookieService.get('user'))
    this.user = this.profileForm?.getRawValue();
    this._getUserUsecase.updateUserById(user.user_id!, this.user!).subscribe((resp) => {
      this.user = resp.body!;
      this.profileForm?.patchValue(this.user);
      this.popup.open(PopUpGenericMessageComponent, {
        disableClose: true,
        data: { title: 'Update!', message: 'Updated user data' },
      });
    });
  }
}
