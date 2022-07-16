import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pop-up-register',
  templateUrl: './pop-up-register.component.html',
  styleUrls: ['./pop-up-register.component.scss'],
})
export class PopUpRegisterComponent implements OnInit {
  constructor(
    private popup: MatDialogRef<PopUpRegisterComponent>,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  goLogin() {
    this._router.navigateByUrl('/auth/login')
  }
}
