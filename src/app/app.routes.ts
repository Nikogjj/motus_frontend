import { mapToCanActivate, Routes } from '@angular/router';
import { HomeComponent } from './home-page/home/home.component';
import { loginGuard } from './guards/login.guard';
import { homeGuard } from './guards/home.guard';
import { PageComponent } from './login-page/page/page.component';
import { RulesComponent } from './rules/rules.component';
import { RankingComponent } from './ranking/ranking.component';
import { isLoggedInGuard } from './guards/is-logged-in.guard';
import { GameComponent } from './game/game.component';

export const routes: Routes = [
    {path:"",redirectTo:"/login",pathMatch:"full"},
    {path:"login",component:PageComponent,canActivate:[loginGuard]},
    {path :"home",component:HomeComponent,canActivate:[homeGuard]},
    {path:"game",component:GameComponent,canActivate:[isLoggedInGuard]},
    {path:"rules",component:RulesComponent,canActivate:[isLoggedInGuard]},
    {path:"ranking",component:RankingComponent,canActivate:[isLoggedInGuard]}
];
