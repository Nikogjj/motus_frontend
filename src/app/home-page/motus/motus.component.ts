import { Component, effect, HostListener, inject, input, SimpleChange, SimpleChanges } from '@angular/core';
import { Letter } from '../../interfaces/letter';
import { AppService } from '../../service/app.service';
import { CommonModule } from '@angular/common';
import { Mot } from '../../interfaces/mot';
import { KeyboardComponent } from '../keyboard/keyboard.component';

@Component({
  selector: 'app-motus',
  imports: [CommonModule,KeyboardComponent],
  templateUrl: './motus.component.html',
  styleUrl: './motus.component.css'
})
export class MotusComponent {
  appServices = inject(AppService);
  tab_difficulte =["facile","intermédiaire","moyen","difficile","hardcore"];
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
    difficulte : ""
  };
  indexTrackLetter : number = 0;
  nb_tentaive = 0;
  nb_tentatives_max = 6;
  tab_mot_tentative : Array<Array <Letter>> = [];

  async ngOnInit(){
    this.motATrouver = await this.appServices.getRandomMot();
    console.log(this.motATrouver)
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
    console.log(motDuJoueur)
    motDuJoueur.forEach((lettre,i) => {
      if (lettre.value == motADeviner[i]) {
        console.log("MASSSI")
        //ICI LE BUG
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
    console.log(motDuJoueur);
    console.log("fait")
  }
  checkColor(lettre : Letter){
    if (lettre.checkPosition) {
      return "rgb(228, 0, 0)";
    }
    else if(lettre.exist && lettre.checkPosition==false){
      return "rgb(255, 217, 0)";
    }
    else{
      return "grey";
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

  onKeyDown(key : string){
    if (key === "⏎") {
      key = "Enter";
    }
    console.log(key)
    if (this.isGameFinish==true) {
      return;
    }
    if (/^[\p{L}]$/u.test(key) && this.indexTrackLetter < this.motATrouver.mot.length) {
      this.addLetter(key);
      console.log(this.tab_mot_tentative);
    }
    else if (key === "←" || key === "Backspace") {
      if (this.indexTrackLetter==0) {
      }
      else{
        this.deleteLetter();
        this.indexTrackLetter--;
      }
      console.log(this.tab_mot_tentative);
    }
    else if (key === "Enter") {
      console.log("massiiiiiiiiii")
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

  addLetter(key : string){
    const lettre : Letter = {
      value : key.toLowerCase(),
      exist : false,
      checkPosition : false
    }
      this.tab_mot_tentative[this.nb_tentaive][this.indexTrackLetter] = lettre;
      this.indexTrackLetter++
  }
  deleteLetter(){
    this.tab_mot_tentative[this.nb_tentaive][this.indexTrackLetter-1] = this.lettreVide
  }

  async restartGame(){
    this.motATrouver = await this.appServices.getRandomMot()
    this.nb_tentaive=0;
    this.clearTabTentative()
    this.msgGameFinish = "";
    this.isGameFinish = false;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    let key = event.key
    this.onKeyDown(key);
  }

  // Appelé quand touche virtuelle cliquée
  onVirtualKeyDown(key: string) {
    this.onKeyDown(key)
  }
}
