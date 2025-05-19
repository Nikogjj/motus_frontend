import { Injectable, InputSignal } from '@angular/core';
import { Mot } from '../interfaces/mot';
import { Letter } from '../interfaces/letter';
import { Router } from '@angular/router';
import { Rank } from '../interfaces/rank';
import { LocalizedString } from '@angular/compiler';
import { UserInfos } from '../interfaces/user-infos';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }
  public getRandomMot(){
    return new Promise <Mot>((resolve,reject)=>{
      
      const options={
        method : "GET",
      }
      fetch("http://localhost:8000/api/get_random_mot",options)
      .then(res=>res.json())
      .then(res=>resolve(res))
      .catch(error=>reject(error))
    })
    }

    public getRandomMotByDifficulte(difficulte : string){
    return new Promise <Mot> ((resolve,reject)=>{
      const token = localStorage.getItem("token")
      const options={
        method : "POST",
        body : JSON.stringify({"difficulte":difficulte}),
        headers : {
          "Authorization" : `Bearer ${token}`,
          "Content-Type" : "application/json"
        }
      }
      // console.log(options)
      fetch("http://localhost:8000/api/get_random_mot_by_difficulte",options)
      .then(res=>res.json())
      .then(res=>resolve(res))
      .catch(error=>reject(error))
      })
    }

    navigateToRules(router : Router){
      router.navigate(["rules"]);
    }
    navigateToRanking(router : Router){
      router.navigate(["ranking"]);
    }
    navigateToMotus(router : Router){
      router.navigate(["motus"]);
    }
    navigateToGame(router :Router){
      router.navigate(["game"])
    }

    getRanking(){
      return new Promise <Array <Rank>>((resolve,reject)=>{
        const token = localStorage.getItem("token");
        const options={
          method : "POST",
          headers : {
            // "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
          }
        }
        fetch("http://localhost:8000/api/get_ranking",options)
        .then(res=>{
          console.log(res)
          return res.json()
        })
        .then(res=>{
          console.log(res)
          resolve(res)
        })
        .catch(error=>reject(error))
      })
    }
    getInfosUser(){
      return new Promise <UserInfos>((resolve,reject)=>{
        const token = localStorage.getItem("token")
        const options = {
          method : "GET",
          headers : {
            "Authorization" : `Bearer ${token}`,
            "Content-Type" : "apllication/json"
          }
        }
        fetch("http://localhost:8000/api/get_infos_user",options)
        .then(res=>res.json())
        .then(res=>resolve(res))
        .catch(error=>reject(error))
      })

    }
}
