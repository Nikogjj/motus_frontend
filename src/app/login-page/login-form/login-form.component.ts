import { Component, NgModule } from '@angular/core';
import { FormControl, FormGroup, NgForm, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  loginForm = new FormGroup({
    identifiant : new FormControl(""),
    password : new FormControl("")
  })

  onSubmit(){
    
  }
}
