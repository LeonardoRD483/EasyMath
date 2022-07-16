import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-layout',
  templateUrl: './student-layout.component.html',
  styleUrls: ['./student-layout.component.scss']
})
export class StudentLayoutComponent implements OnInit {

  constructor(private _cookieService: CookieService,private _route: Router) {}

  ngOnInit(): void {}

  clearAllCookie(){
    this._cookieService.deleteAll('/')
    this._route.navigateByUrl('/auth/login')
  }

}
