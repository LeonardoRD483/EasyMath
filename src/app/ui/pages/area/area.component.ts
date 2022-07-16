import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../infraestructure/store/app.reducers';
import { getAreas, getAreasSuccess, getAreasEnable, getAreasEnableSuccess } from '../../../infraestructure/store/actions/area.actions';
import { CookieService } from 'ngx-cookie-service';
import { Actions, ofType } from '@ngrx/effects';
import { IAreas } from '../../../domain/models/area/IArea';
import { Subject, takeUntil } from 'rxjs';
import { GetUserUsecase } from '../../../domain/usecase/get-user-usecase';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss'],
})
export class AreaComponent implements OnInit {
  score?: number;
  areas = [
    {
      id: 0,
      name_area: 'suma',
      url_img: 'assets/img/area/suma.jpg',
      isBlock: true,
    },
    {
      id: 1,
      name_area: 'resta',
      url_img: 'assets/img/area/resta.jpg',
      isBlock: true,
    },
    {
      id: 2,
      name_area: 'multiplicacion',
      url_img: 'assets/img/area/multiplicacion.jpg',
      isBlock: true,
    },
    {
      id: 3,
      name_area: 'division',
      url_img: 'assets/img/area/division.jpg',
      isBlock: true,
    },
    {
      id: 4,
      name_area: 'potencia',
      url_img: 'assets/img/area/potencia.jpg',
      isBlock: true,
    },
  ];

  destroyed$ = new Subject<boolean>();

  constructor(
    private _cookieService: CookieService,
    private _actions$: Actions,
    private _store: Store<AppState>,
    private _getUserUsecase: GetUserUsecase
  ) {}

  ngOnInit(): void {
    this.getAreas();
    this.getAreasEnableByUser();
    this.getScore()

  }

  getScore(){
    this._getUserUsecase.getScores().subscribe((score)=>{
      console.log(score)
      this.score = score.body.score
    })
  }



  getAreas() {
    this._store.dispatch(getAreas({ getAreas: true }));
    this._actions$.pipe(ofType(getAreasSuccess),takeUntil(this.destroyed$)).subscribe((data)=>{
      this.enableArea();
    })
  }

  getAreasEnableByUser() {
    this._store.dispatch(getAreasEnable({ getAreasEnable: true }));
    this._actions$.pipe(ofType(getAreasEnableSuccess),takeUntil(this.destroyed$)).subscribe((data)=>{
      this.enableArea();
    })
  }

  enableArea() {
    let areas_enabled: IAreas = JSON.parse(this._cookieService.get('areas_enabled'));
    let a = this.areas.filter(objArea => areas_enabled.areas?.some(area => objArea.name_area == area.fields?.name))

    a.forEach(area => {
      this.areas[area.id].isBlock = false;
    });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
}
}
