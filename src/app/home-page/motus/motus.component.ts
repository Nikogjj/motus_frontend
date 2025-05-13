import { Component, effect, inject, input, SimpleChange, SimpleChanges } from '@angular/core';
import { Letter } from '../../interfaces/letter';
import { AppService } from '../../service/app.service';
import { CommonModule } from '@angular/common';
import { Mot } from '../../interfaces/mot';

@Component({
  selector: 'app-motus',
  imports: [CommonModule],
  templateUrl: './motus.component.html',
  styleUrl: './motus.component.css'
})
export class MotusComponent {
  appServices = inject(AppService);

  isGameFinish : boolean = false;
  msgGameFinish : string = "";
  
  lettreVide : Letter = {
    value : " ",
    exist : false,
    checkPosition : false
  }
  motATrouver : Mot = {
    mot : "",
    longueur : 0,
    difficulté : ""
  };
  indexTrackLetter : number = 0;
  nb_tentaive = 0;
  nb_tentatives_max = 6;
  tab_mot_tentative : Array<Array <Letter>> = [];

  async ngOnInit(){
    this.motATrouver = await this.appServices.getRandomMot();
    this.clearTabTentative();
  }
  
  clearTabTentative(){
    for (let i = 0; i < this.nb_tentatives_max; i++) {
      this.tab_mot_tentative[i] = new Array(this.motATrouver.mot.length).fill(this.lettreVide,0,this.motATrouver.mot.length);
    }
    let lettre : Letter={
      value : this.motATrouver.mot[0],
      exist : false,
      checkPosition : false,
    }
    this.tab_mot_tentative[0][0] = lettre;
    console.log(this.motATrouver)
  }

  changeColor(motADeviner : string, motDuJoueur : Array <Letter>){
    motDuJoueur.forEach((lettre,i) => {
      if (lettre.value == motADeviner[i]) {
        lettre.checkPosition=true,
        lettre.exist=true
      }
      else if(motADeviner.includes(lettre.value??="")){
        lettre.exist=true;
        lettre.checkPosition=false;
      }
      else{
        lettre.checkPosition=false;
        lettre.exist=false;
      }
    });
  }
  checkColor(lettre : Letter){
    if (lettre.checkPosition) {
      return "red";
    }
    else if(lettre.exist && lettre.checkPosition==false){
      return "yellow";
    }
    else{
      return "blue";
    }
  }

  checkVictory(motADeviner : string, motDuJoueur : Array <Letter>){
    let count = 0;
    motDuJoueur.forEach((lettre,i) => {
      if (lettre.value == motADeviner[i]) {
        count++
      }
    });
    if (count==motADeviner.length) {
      this.msgGameFinish = "Vous avez gagné"
      this.isGameFinish = true;
      return true;
    }
    else{
      return false;
    }
  }
  checkDefeat(){
    if (this.nb_tentaive == this.nb_tentatives_max) {
      console.log("PERDU")
      return true;
    }
    else{
      console.log(" PAS ENCORE PERDU")
      console.log("tentative max :",this.nb_tentatives_max)
      console.log("tentative :",this.nb_tentaive)
      return false;
    }
  }

  onKeyDown(event : KeyboardEvent){
    if (this.isGameFinish==true) {
      return;
    }
    if (/^[\p{L}]$/u.test(event.key) && this.indexTrackLetter < this.motATrouver.mot.length) {
      const lettre : Letter = {
      value : event.key,
      exist : false,
      checkPosition : false
      }
      this.tab_mot_tentative[this.nb_tentaive][this.indexTrackLetter] = lettre;
      this.indexTrackLetter++
    }
    else if (event.key == "Backspace") {
      const length = this.tab_mot_tentative[this.nb_tentaive].length;
      this.tab_mot_tentative[this.nb_tentaive][this.indexTrackLetter-1] = this.lettreVide
      if (this.indexTrackLetter !=0) {
        this.indexTrackLetter--
      }
    }
    else if (event.key == "Enter") {
      if (this.indexTrackLetter == this.motATrouver.mot.length) {
        this.changeColor(this.motATrouver.mot,this.tab_mot_tentative[this.nb_tentaive])
        this.checkVictory(this.motATrouver.mot,this.tab_mot_tentative[this.nb_tentaive])
        this.nb_tentaive++;
        if (this.checkDefeat()) {
          this.isGameFinish = true
          this.msgGameFinish = "Vous avez perdu vous êtes nul"
        }
        this.indexTrackLetter=0;
      }
      else{
        console.log(this.indexTrackLetter)
        console.log(this.tab_mot_tentative)
        console.log("enter mais length pas ok");
      }
    }
  }

  async restartGame(){
    this.motATrouver = await this.appServices.getRandomMot()
    this.nb_tentaive=0;
    this.clearTabTentative()
    this.msgGameFinish = "";
    this.isGameFinish = false;
  }
}
