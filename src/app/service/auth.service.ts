import { inject, Injectable } from '@angular/core';
import { CreateInfos } from '../interfaces/create-infos';
import { ResponseCreateInfos } from '../interfaces/response-create-infos';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { LoginInfos } from '../interfaces/login-infos';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClient = inject(HttpClient)
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
      fetch("http://0.0.0.0:8000/api/createUser",options)
      .then(res=>{
        console.log(res)
        return res.json()
      })
      .then(res=>resolve(res))
      .catch(error=>reject(error))
    })
  }

  public login(loginInfos : LoginInfos){
    return new Promise <ResponseCreateInfos>((resolve,reject)=>{
      
      const options={
        method : "POST",
        body : JSON.stringify(loginInfos),
        headers : {
          "Content-Type" : "application/json"
        }
      }
      
      fetch("http://localhost:8000/api/login_user",options)
      .then(res=>res.json())
      .then(res=>resolve(res))
      .catch(error=>reject(error))
    })

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
