import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './infraestructure/guard/auth.guard';
import { StudentLayoutComponent } from './ui/layout/student-layout/student-layout.component';
import { AreaComponent } from './ui/pages/area/area.component';
import { HomeComponent } from './ui/pages/home/home.component';
import { LoginComponent } from './ui/pages/login/login.component';
import { ProfileComponent } from './ui/pages/profile/profile.component';
import { RankingComponent } from './ui/pages/ranking/ranking.component';
import { RegisterComponent } from './ui/pages/register/register.component';
import { ShowAreaComponent } from './ui/pages/show-area/show-area.component';
import { ShowLevelComponent } from './ui/pages/show-level/show-level.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'student',
    component: StudentLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'area', component: AreaComponent },
      { path: 'area/:name_area', component: ShowAreaComponent },
      { path: 'area/:name_area/:level', component: ShowLevelComponent },
      { path: 'ranking', component: RankingComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'home', component: HomeComponent },
      { path: '**', redirectTo: 'area', pathMatch: 'full' },
    ],
  },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
