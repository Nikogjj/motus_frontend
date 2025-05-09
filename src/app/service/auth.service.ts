import { inject, Injectable } from '@angular/core';
import { CreateInfos } from '../interfaces/create-infos';
import { ResponseCreateInfos } from '../interfaces/response-create-infos';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

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
}
