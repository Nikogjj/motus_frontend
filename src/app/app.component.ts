import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageComponent } from './login-page/page/page.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,PageComponent,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
