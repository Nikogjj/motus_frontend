import { Component } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';
import { CreateAccountFormComponent } from '../create-account-form/create-account-form.component';

@Component({
  selector: 'app-page',
  imports: [LoginFormComponent,CreateAccountFormComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent {

}
