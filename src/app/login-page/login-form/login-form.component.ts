import { Component, inject, NgModule } from '@angular/core';
import { FormControl, FormGroup, NgForm, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { LoginInfos } from '../../interfaces/login-infos';
import { Subject, takeUntil } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  constructor(private router : Router){

  }
  error = 0;
  msg_error_submit="";
  authServices=inject(AuthService);
  
  loginForm = new FormGroup({
    identifiant : new FormControl(""),
    password : new FormControl("")
  })
  
  onSubmit(){
    const loginInfos : LoginInfos = {
      pseudo : this.loginForm.get("identifiant")?.value??"",
      password : this.loginForm.get("password")?.value??""
    }
    this.authServices.login(loginInfos)
    .then(res=>{
      if (res.error == "none") {
        this.error = 0;
        localStorage.setItem("token",res.token)
        this.router.navigate(["/game"]);
      }
      else{
        this.error=1;
        this.msg_error_submit=res.error
      }
    })
    .catch(error=>console.error(error));
  }
}
