import { Component, effect, inject, input, SimpleChange, SimpleChanges } from '@angular/core';
import { Letter } from '../../interfaces/letter';
import { AppService } from '../../service/app.service';
import { CommonModule } from '@angular/common';

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
  
  indexTrackLetter : number = 0;
  mot = input.required<string>();
  nb_tentaive = 0;
  nb_tentatives_max = 6;
  tab_mot_tentative : Array<Array <Letter>> = [];

  motMAJ = effect(()=>{
    const motATrouver = this.mot();
    const firstLettreMotATrouver : Letter = {
      value : this.mot()[0],
      exist : false,
      checkPosition : false
    }
    for (let i = 0; i < this.nb_tentatives_max; i++) {
      this.tab_mot_tentative[i] = new Array(motATrouver.length).fill(this.lettreVide,0,motATrouver.length);
    }
    this.tab_mot_tentative[0][0] = firstLettreMotATrouver;
  })

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

  onKeyDown(event : KeyboardEvent){
    if (this.isGameFinish==true) {
      return;
    }
    if (/^[a-zA-Z]$/.test(event.key) && this.indexTrackLetter < this.mot().length) {
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
      if (this.indexTrackLetter == this.mot().length) {
        this.changeColor(this.mot(),this.tab_mot_tentative[this.nb_tentaive])
        this.checkVictory(this.mot(),this.tab_mot_tentative[this.nb_tentaive])
        this.nb_tentaive++;
        this.indexTrackLetter=0;
      }
      else{
        console.log(this.indexTrackLetter)
        console.log(this.tab_mot_tentative)
        console.log("enter mais length pas ok");
      }
    }
  }

  test(){
    console.log("test")
  }
}
