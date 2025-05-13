import { Injectable, InputSignal } from '@angular/core';
import { Mot } from '../interfaces/mot';
import { Letter } from '../interfaces/letter';

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
    public mot = "";

}
