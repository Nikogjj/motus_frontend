import { inject, Injectable } from '@angular/core';
import { CreateInfos } from '../interfaces/create-infos';
import { ResponseCreateInfos } from '../interfaces/response-create-infos';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { LoginInfos } from '../interfaces/login-infos';
import { ResponseLogin } from '../interfaces/response-login';
import { ResponseLogout } from '../interfaces/response-logout';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  gameService = inject(GameService);
  constructor() { 

  }

  public createAccount(infosUser : CreateInfos) : Promise<ResponseCreateInfos>{
    return new Promise((resolve,reject)=>{
      const options={
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          pseudo : infosUser.identifiant,
          password : infosUser.password,
          numero_secu : infosUser.numero_secu
        })
      }
      console.log({
        pseudo : infosUser.identifiant,
        password : infosUser.password,
        numero_secu : infosUser.numero_secu
      })
      fetch("http://0.0.0.0:8000/api/register",options)
      .then(res=>{
        console.log(res)
        return res.json()
      })
      .then(res=>resolve(res))
      .catch(error=>reject(error))
    })
  }

  public login(loginInfos : LoginInfos){
    return new Promise <ResponseLogin>((resolve,reject)=>{
      
      const options={
        method : "POST",
        body : JSON.stringify(loginInfos),
        headers : {
          "Content-Type" : "application/json"
        }
      }
      
      fetch("http://localhost:8000/api/login",options)
      .then(res=>res.json())
      .then(res=>resolve(res))
      .catch(error=>reject(error))
    })
  }

  public logout(token : string | null){
    return new Promise <ResponseLogout> ((resolve,reject)=>{
      const options={
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${token}`
        }
      }
      fetch("http://localhost:8000/api/logout",options)
      .then(res=>{
        console.log(res)
        return res.json()
      })
      .then(res=>resolve(res))
      .catch(error=>reject(error))
    })
  }

  isLoggedIn(){
    if (localStorage.getItem("token")!=null) {
      return true;
    }
    else{
      return false
    }
  }

  // loginUser(loginInfos: any): Observable<any> {
  //   return this.httpClient.post("http://localhost:8000/api/login_user", loginInfos)
  //     .pipe(
  //       tap(res => {
  //         console.log('Réponse reçue:', res);
  //       }),
  //       catchError(error => {
  //         console.error('Erreur:', error);
  //         return of(null);  // ou throwError(error) selon les besoins
  //       })
  //     );
}
