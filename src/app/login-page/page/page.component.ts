import { Component } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';
import { CreateAccountFormComponent } from '../create-account-form/create-account-form.component';
import { HeaderLoginComponent } from '../../header-login/header-login.component';
import { RulesComponent } from '../../rules/rules.component';

@Component({
  selector: 'app-page',
  imports: [LoginFormComponent,CreateAccountFormComponent,RulesComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent {

}
