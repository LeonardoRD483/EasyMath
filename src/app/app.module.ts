import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserGateway } from './domain/models/user/gateway/user-gateway';
import { UserService } from './infraestructure/driven-adapter/user/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './ui/shared/shared.module';
import { LoginComponent } from './ui/pages/login/login.component';
import { HomeComponent } from './ui/pages/home/home.component';
import { CookieService } from 'ngx-cookie-service';
import { RegisterComponent } from './ui/pages/register/register.component';
import { StudentLayoutComponent } from './ui/layout/student-layout/student-layout.component';
import { AreaComponent } from './ui/pages/area/area.component';
import { RankingComponent } from './ui/pages/ranking/ranking.component';
import { PopUpRegisterComponent } from './ui/components/pop-up-register/pop-up-register.component';
import { ShowAreaComponent } from './ui/pages/show-area/show-area.component';
import { ProfileComponent } from './ui/pages/profile/profile.component';
import { PopUpGenericMessageComponent } from './ui/components/pop-up-generic-message/pop-up-generic-message.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './infraestructure/store/effects/usuario.effects';
import { _userReducer } from './infraestructure/store/reducers/usuario.reducers';
import { LevelGateway } from './domain/models/level/gateway/level-gateway';
import { LevelService } from './infraestructure/driven-adapter/level/level.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './infraestructure/interceptor/auth.interceptor';
import { AreaService } from './infraestructure/driven-adapter/area/area.service';
import { AreaGateway } from './domain/models/area/gateway/area-gateway';
import { LevelEffects } from './infraestructure/store/effects/level.effects';
import { _levelReducer } from './infraestructure/store/reducers/level.reducers';
import { _areaReducer } from './infraestructure/store/reducers/area.reducers';
import { AreaEffects } from './infraestructure/store/effects/area.effects';
import { ShowLevelComponent } from './ui/pages/show-level/show-level.component';
import { ItemProblemComponent } from './ui/components/item-problem/item-problem.component';
import { ProblemGateway } from './domain/models/problem/gateway/problem-gateway';
import { ProblemService } from './infraestructure/driven-adapter/problem/problem.service';
import { ProblemEffects } from './infraestructure/store/effects/problem.effects';
import { _problemReducer } from './infraestructure/store/reducers/problem.reducers';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    StudentLayoutComponent,
    AreaComponent,
    RankingComponent,
    PopUpRegisterComponent,
    ShowAreaComponent,
    ProfileComponent,
    PopUpGenericMessageComponent,
    ShowLevelComponent,
    ItemProblemComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    StoreModule.forRoot({
      user: _userReducer,
      levels: _levelReducer,
      areas: _areaReducer,
      problems: _problemReducer
    }),
    EffectsModule.forFeature([UserEffects, LevelEffects, AreaEffects, ProblemEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
  ],
  providers: [
    { provide: UserGateway, useClass: UserService },
    { provide: LevelGateway, useClass: LevelService },
    { provide: AreaGateway, useClass: AreaService },
    { provide:ProblemGateway, useClass: ProblemService },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    CookieService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
