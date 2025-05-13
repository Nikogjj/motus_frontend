import { Routes } from '@angular/router';
import { HomeComponent } from './home-page/home/home.component';
import { loginGuard } from './guards/login.guard';
import { homeGuard } from './guards/home.guard';
import { LoginFormComponent } from './login-page/login-form/login-form.component';
import { PageComponent } from './login-page/page/page.component';

export const routes: Routes = [
    {path:"",redirectTo:"/login",pathMatch:"full"},
    {path:"login",component:PageComponent,canActivate:[loginGuard]},
    {path :"home",component:HomeComponent,canActivate:[homeGuard]}
];
