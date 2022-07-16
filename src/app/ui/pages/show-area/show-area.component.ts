import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  getLevelsEnable,
  getLevelsSuccess,
} from '../../../infraestructure/store/actions/level.actions';
import { CookieService } from 'ngx-cookie-service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../infraestructure/store/app.reducers';
import { ILevels, Level } from '../../../domain/models/level/ILevels';
import { Actions, ofType } from '@ngrx/effects';
import {
  getLevelsEnableSuccess,
  getLevels,
} from '../../../infraestructure/store/actions/level.actions';

@Component({
  selector: 'app-show-area',
  templateUrl: './show-area.component.html',
  styleUrls: ['./show-area.component.scss'],
})
export class ShowAreaComponent implements OnInit {
  areas = [
    { name: 'suma', id: 1 },
    { name: 'resta', id: 2 },
    { name: 'multiplicacion', id: 3 },
    { name: 'division', id: 4 },
    { name: 'potencia', id: 5 },
  ];

  levels?: Level[];
  area_id?: number;
  name_area?:string;

  constructor(
    private _route: ActivatedRoute,
    private _cookieService: CookieService,
    private _store: Store<AppState>,
    private _actions$: Actions
  ) {}

  ngOnInit(): void {
    this.area_id = this.getAreaIDByName();
    this.getLevelsByArea(this.area_id);
    this.getLevelsEnableByUserAndArea(this.area_id);
  }

  getAreaIDByName(): number {
    this.name_area = this._route.snapshot.paramMap.get('name_area')!;
    let area_id = this.areas.filter((area) => area.name == this.name_area)[0].id;
    return area_id;
  }

  getLevelsByArea(area_id: number) {
    this._store.dispatch(getLevels({ area: area_id }));
    this._actions$?.pipe(ofType(getLevelsSuccess)).subscribe((resp) => {
      this.getLevels();
    });
  }

  getLevels() {
    let levels = JSON.parse(this._cookieService.get('levels'));
    this.levels = levels.map((level: Level) => {
      level.isBlock = true;
      return level;
    });
  }

  getLevelsEnableByUserAndArea(area_id: number) {
    this._store.dispatch(getLevelsEnable({ area: area_id }));
    this._actions$?.pipe(ofType(getLevelsEnableSuccess)).subscribe((resp) => {
      this.enableLevels();
    });
  }
  enableLevels() {
    let area = 0;

    let levels_enabled: Level[] = JSON.parse(
      this._cookieService.get('levels_enable')
    );

    if(this.area_id == 1){
      area = 1
    }else if(this.area_id == 2){
      area = 11
    }else if(this.area_id == 3){
      area = 21
    }else if(this.area_id == 4){
      area = 31
    }else if(this.area_id == 5){
      area = 41
    }
    levels_enabled.forEach((level) => {
      this.levels![level.pk! - area].isBlock = false;
    });
  }
}
