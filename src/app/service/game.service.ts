import { HostListener, inject, Injectable, InputSignal } from '@angular/core';
import { Mot } from '../interfaces/mot';
import { Letter } from '../interfaces/letter';
import { RowComponent } from '../row/row.component';
import { Token } from '@angular/compiler';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  appService = inject(AppService)
  motATrouverInfo : Mot = {
    longueur : 0,
    mot : "",
    difficulte : ""
  };
  motATrouver : Array <Letter> = [];
  motDuJoueur : Array<Letter> = [];
  grilleDeMot : Array <Array<Letter>> = [];
  grilleBonnePosition : Array <Array<Letter>> = [];

  nb_tentatives : number = 0;
  nb_tentatives_max : number = 6;
  trackIndex : number = 0;

  lettreVide : Letter = {
    value : "",
    exist : false,
    checkPosition : false
  }

  isGameFinish : boolean = false;
  msgGameFinish = "";

  pseudo : string = "";
  score : number = 0;
  scoreWin : number = 0;

  constructor() { 
    this.getRandomMot()
    .then(async mot=>{
      this.motATrouverInfo=mot;
      this.updateMotATrouver();
      this.reinitialiseGrilleBonnePostion();
      this.reinitialiseGrilleDeMot();
      this.fillMotDuJoueur();
      this.appService.getInfosUser().then(res=>{
        this.pseudo=res.pseudo;
        this.score= res.score;
      })
      await this.appService.getInfosUser()
      .then(res=>{
        this.pseudo = res.pseudo,
        this.score = res.score
      })
    })
  }

  async updateScoreJoueur(difficulte : string){
    switch (difficulte) {
      case "facile":
        this.scoreWin = 10;
      break;
      case "intermédiaire":
        this.scoreWin = 14;
      break;
      case "moyen":
        this.scoreWin = 20;
      break;
      case "difficile":
        this.scoreWin = 25;
      break;
      case "hardcore":
        this.scoreWin = 30;
      break;
      default:
        break;
    }
    this.score += this.scoreWin;
    const token = localStorage.getItem("token");
    const options = {
      method : "POST",
      headers : {
        "Authorization" : `Bearer ${token}`,
        "Content-Type" : "apllication/json"
      },
      body : JSON.stringify({
        scoreToAdd : this.scoreWin
      })
    }
    fetch("http://localhost:8000/api/update_score_user",options)
    .then(res=>res.json())
    .then(res=>console.log(res))
    .catch(error=>console.error(error))
  }

  restartGameWithDifficulte(difficulte : string){
    this.getRandomMotByDifficulte(difficulte)
    .then(mot=>{
      this.motATrouverInfo=mot;
      this.updateMotATrouver();
      this.reinitialiseGrilleBonnePostion();
      this.reinitialiseGrilleDeMot();
      this.fillMotDuJoueur();
      this.isGameFinish = false;
      this.trackIndex = 0;
      this.nb_tentatives = 0;
    })

  }
  restartGame(){
    this.getRandomMot()
    .then(mot=>{
      this.motATrouverInfo=mot;
      this.updateMotATrouver();
      this.reinitialiseGrilleBonnePostion();
      this.reinitialiseGrilleDeMot();
      this.fillMotDuJoueur();
      this.isGameFinish = false;
      this.trackIndex = 0;
      this.nb_tentatives = 0;
    })

  }

  fillMotDuJoueur(){
    for (let i = 0; i < this.motATrouverInfo.longueur; i++) {
      const lettreUpdated : Letter={
        value : "",
        exist : false,
        checkPosition:false
      }
      this.motDuJoueur[i]=lettreUpdated;
    }
  }
  updateMotATrouver(){
    for (let i = 0; i < this.motATrouverInfo.mot.length; i++) {
      const lettre : Letter = {
        value : this.motATrouverInfo.mot[i],
        exist : false,
        checkPosition : false,
      }
      this.motATrouver[i] = lettre;
    }
    this.motATrouver.splice(this.motATrouverInfo.longueur,this.motATrouver.length)
  }
  reinitialiseGrilleDeMot(){
    for (let i = 0; i < this.nb_tentatives_max; i++) {
      this.grilleDeMot[i] = new Array(this.motATrouver.length).fill(this.lettreVide,0,this.motATrouver.length);
    }
    this.grilleDeMot[0][0] = this.motATrouver[0];
  }
  reinitialiseGrilleBonnePostion(){
    for (let i = 0; i < this.nb_tentatives_max; i++) {
      this.grilleBonnePosition[i] = new Array(this.motATrouver.length).fill(this.lettreVide,0,this.motATrouver.length);
      this.grilleBonnePosition[i].splice(this.motATrouverInfo.longueur,this.grilleBonnePosition[i].length)
    }
    this.grilleBonnePosition[0][0] = this.motATrouver[0];
  }
  getMotFromGrilleWithIndex(index :number){
    return this.grilleDeMot[index]
  }
  getMotFromGrilleBonnePosition(index:number){
    if (this.isGameFinish) {
      return this.motDuJoueur
    }
    return this.grilleBonnePosition[index]
  }   
  getRandomMotByDifficulte(difficulte : string){
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
  getRandomMot(){
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
  handleKeyDown(key: string) {
    // console.log(this.motDuJoueur)
    if (this.isGameFinish) {
      return
    }
    if (/^[\p{L}]$/u.test(key) && this.trackIndex < this.motATrouver.length) {
      // console.log("add")
      this.addLetterToMotJoueur(key)
    }
    else if(key == "Backspace" && this.trackIndex !=0){
      // console.log("delete")
      this.deleteLetterToMotJoueur()
    }
    else if(key=="Enter" && this.trackIndex == this.motATrouver.length){
      // console.log("CEST LA")
      // console.log(key)
      // console.log("ENTER 1:",this.motDuJoueur)
      this.submitMot()
      // console.log("ENTER 2:",this.motDuJoueur)
    }
  }
  checkIfExist(){
    this.grilleDeMot[this.nb_tentatives].forEach((lettre,i,mot)=>{
      if (this.myInclude(this.motATrouver,mot[i])) {
        mot[i].exist = true;
      }
    })
  }
  checkPosition(){
    this.grilleDeMot[this.nb_tentatives].forEach((lettre,i,mot)=>{
      if (mot[i].value == this.motATrouver[i].value) {
        mot[i].checkPosition = true;
        mot[i].exist = true;
        lettre = {
          value : mot[i].value,
          checkPosition : true,
          exist : true
        }
        if (this.nb_tentatives == this.nb_tentatives_max-1) {
          
        }
        else{
          this.grilleBonnePosition[this.nb_tentatives+1][i]=lettre
        }
      }
      else{
        if (!this.grilleBonnePosition[this.nb_tentatives][i].checkPosition) {
          this.grilleBonnePosition[this.nb_tentatives][i] = {
            value : "",
            checkPosition :false,
            exist : false,
          }
        }
        else{
          if (this.nb_tentatives == this.nb_tentatives_max-1) {
            
          }
          else{
            this.grilleBonnePosition[this.nb_tentatives+1][i] = {
              value : this.motATrouver[i].value,
              exist : true,
              checkPosition : true
            }
          }
        }
      }
    })
    if (this.nb_tentatives == this.nb_tentatives_max-1) {
          
    }
    else{
      this.grilleBonnePosition[this.nb_tentatives+1][0]=this.motATrouver[0]

    }
  }
  myInclude(mot : Array <Letter>,lettre : Letter){
    let motATrouver = "";
    let lettreJoueur = lettre.value??="";
    mot.forEach((lettre,i,mot) => {
      motATrouver = motATrouver.concat(mot[i].value??=""); 
    });
    // console.log(motATrouver);
    // console.log(lettreJoueur)
    if (motATrouver.includes(lettreJoueur)) {
      // console.log(true)
      return true;
    }
    else{
      // console.log(false)
      return false;
    }
  }
  updateNextRowGrille(){
    const motAComparé = this.grilleDeMot[this.nb_tentatives];
    this.grilleDeMot[this.nb_tentatives+1].forEach((lettre,i,mot) => {
      if (this.motATrouver[i].value == motAComparé[i].value) {
        const lettreUpdated : Letter = {
          value : this.motDuJoueur[i].value,
          exist : true,
          checkPosition : true
        }
        mot[i]=lettreUpdated;
      }
      else if(this.myInclude(this.motATrouver,this.motDuJoueur[i]) && !(motAComparé[i].checkPosition) ){
          const lettreUpdated : Letter = {
            value : "",
            exist : true,
            checkPosition : false
          }
          mot[i]=lettreUpdated;
      }
      else{
        if (this.grilleDeMot[this.nb_tentatives][i].checkPosition) {
          const lettreUpdated : Letter = {
            value : this.grilleDeMot[this.nb_tentatives][i].value,
            exist : true,
            checkPosition : false
          }          
          mot[i]=lettreUpdated
        }
        else{
          const lettreUpdated : Letter = {
          value : "",
          exist : false,
          checkPosition : false
        }
        mot[i]=lettreUpdated;
        // console.log("mot pas trouver",i)
        }
      }
    });
    const lettreUpdated : Letter = {
      value : this.motATrouver[0].value,
      exist : false,
      checkPosition : false
    }
    this.grilleDeMot[this.nb_tentatives+1][0] = lettreUpdated
  }
  resetMotDuJoueur(){
    this.motDuJoueur.forEach((lettre,i) => {
      const lettreUpdate : Letter ={
        value : "",
        exist : false,
        checkPosition : false
      }
      this.motDuJoueur[i]=lettreUpdate;
    });
    this.trackIndex=0;
    console.log(this.motDuJoueur)
  }
  addLetterToMotJoueur(key:string){
    this.motDuJoueur[this.trackIndex]={
      value:key,
      exist:false,
      checkPosition:false
    };
    this.trackIndex++
  }
  deleteLetterToMotJoueur(){
    this.trackIndex--
      this.motDuJoueur[this.trackIndex]={
        value:"",
        exist:false,
        checkPosition:false
      }
  
  }
  checkVictoryOrDefeat(){
    let motATrouver = "";
    let motduJoueur = "";
    this.motATrouver.forEach((lettre,i,mot) => {
      motATrouver = motATrouver.concat(mot[i].value??=""); 
    });
    this.motDuJoueur.forEach((lettre,i,mot) => {
      motduJoueur = motduJoueur.concat(mot[i].value??=""); 
    });
    // console.log(motATrouver);
    // console.log(motduJoueur);
    if (motATrouver == motduJoueur) {
      console.log("victory")
      return "victory"
    }
    else{
      if (this.nb_tentatives==this.nb_tentatives_max-1) {
      console.log("defeat")
        return "defeat"
      }
      else{
        console.log("continue")
        return "continue"
      }
    }
  }
  checkColorVirtualKeyboard(key : string){
    const keyboardLetter = {
      value : key,
      color : "grey"
    }
    this.grilleBonnePosition.forEach((copy_tab,i,tab_mot) => {
      if (keyboardLetter.color=="red") {
        return
      }
      tab_mot[i].forEach((copy_mot,i,mot) => { 
        if (mot[i].value == keyboardLetter.value) {
          // console.log(key,"red")
          keyboardLetter.color = "red"
        }
        else{
          if (keyboardLetter.color == "red") {
            
          }
          else{
            keyboardLetter.color = "grey"
          }
        }
      });
      return keyboardLetter.color
    });
  }
  submitMot(){
    this.grilleDeMot[this.nb_tentatives].forEach((lettre,i,mot) => {
      const lettreUpdated = {
        value : this.motDuJoueur[i].value,
        exist : false,
        checkPosition : false
      }
      mot[i]=lettreUpdated;
    });
    console.log("MOT DU JOUEUR",this.motDuJoueur);
    console.log("nb_tentatives",this.nb_tentatives)
    console.log("nb_tentatives_max",this.nb_tentatives_max)

    this.checkPosition()
    this.checkIfExist()

    switch (this.checkVictoryOrDefeat()) {
      case "victory":
        this.resetMotDuJoueur();
        this.grilleBonnePosition[this.nb_tentatives] = this.motDuJoueur
        // console.log(this.grilleBonnePosition[this.nb_tentatives]);
        this.nb_tentatives++
        this.msgGameFinish = "Vous avez gagné !"
        this.isGameFinish = true;
        this.updateScoreJoueur(this.motATrouverInfo.difficulte)
        break;
      case "defeat":
        this.resetMotDuJoueur();
        this.msgGameFinish = "Vous avez perdu !"
        this.scoreWin = 0;
        this.nb_tentatives++
        this.isGameFinish = true;
        break;
      case "continue":
        this.resetMotDuJoueur();
        this.nb_tentatives++
        break;
      default:
        console.log("error")
        break;
    }
  }


}
