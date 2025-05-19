import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PageComponent } from './login-page/page/page.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './service/auth.service';
import { HeaderLoginComponent } from './header-login/header-login.component';
import { AppService } from './service/app.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,PageComponent,HeaderComponent,HeaderLoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  authService=inject(AuthService)
  appService=inject(AppService)
  title = 'frontend';
  router = inject(Router);
}
