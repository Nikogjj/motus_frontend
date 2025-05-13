import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-account-form',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './create-account-form.component.html',
  styleUrl: './create-account-form.component.css'
})
export class CreateAccountFormComponent {
  authServices = inject(AuthService);

  createAccountForm = new FormGroup({
    identifiant : new FormControl("",[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ]),
    password : new FormControl("",[
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50)
    ]),
    confirmed_password : new FormControl("",[
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50)
    ])
  })

  verifyPassword = 0;
  verifyIfAccountCreated = 0;
  msgAccountCreated="";

  async onSubmit(){
    if (this.createAccountForm.invalid) {
      this.createAccountForm.markAllAsTouched();
      console.log("alltouched")
      return;
    }
    if (this.createAccountForm.controls.password.value != this.createAccountForm.controls.confirmed_password.value) {
      console.log("Les mots de passe ne correspondent pas")
      this.verifyPassword=1
      return;
    }
    await this.authServices.createAccount({
      identifiant : this.createAccountForm.controls.identifiant.value ?? "",
      password : this.createAccountForm.controls.password.value ?? "",
      numero_secu : ""
    })
    .then(res=>{
      console.log(res)
      if (res.error == "none" ) {
        this.verifyIfAccountCreated = 1;
        this.msgAccountCreated=res.message
      }
      else{
        this.verifyIfAccountCreated = 1;
        this.msgAccountCreated=res.message;
      }
    }).catch(console.log)
    console.log("send to api rest")
  }

  isInvalidTouchedOrDirty(name : string){
    return this.createAccountForm.get(name)?.invalid && ( this.createAccountForm.get(name)?.touched || this.createAccountForm.get(name)?.dirty);
  }

  isPasswordSame(name : string){
    if(this.createAccountForm.get("password")?.value != this.createAccountForm.get("confirmed_password")?.value) return true;
    else{
      return false
    }
  }

}
