import { Component, effect, inject, input, SimpleChange, SimpleChanges } from '@angular/core';
import { Letter } from '../../interfaces/letter';
import { AppService } from '../../service/app.service';
import { CommonModule } from '@angular/common';
import { first } from 'rxjs';

@Component({
  selector: 'app-motus',
  imports: [CommonModule],
  templateUrl: './motus.component.html',
  styleUrl: './motus.component.css'
})
export class MotusComponent {
  appServices = inject(AppService);
  lettreVide : Letter = {
    value : undefined,
    exist : false,
    checkPosition : false
  }
  indexMyMot : number = 0;
  mot = input.required<string>();
  nb_tentaive = 0;
  nb_tentatives_max = 6;
  my_input : Array<Letter> = [];
  my_mot : Array<Letter> = [];
  tab_mot_tentative : Array<Array <Letter>> = [];

  motMAJ = effect(()=>{
    const motATrouver = this.mot();
    const firstLettreMotATrouver : Letter = {
      value : this.mot()[0],
      exist : false,
      checkPosition : false
    }
    const lettreEspace : Letter = {
      value : " ",
      exist : false,
      checkPosition : false
    }

    for (let i = 0; i < this.nb_tentatives_max; i++) {
      this.tab_mot_tentative[i] = new Array(motATrouver.length).fill(lettreEspace,0,motATrouver.length);
    }
    this.tab_mot_tentative[0][0] = firstLettreMotATrouver;

    this.my_mot = new Array(motATrouver.length).fill(this.lettreVide,0,motATrouver.length);
    this.my_mot[0] = firstLettreMotATrouver;

    console.log(this.my_mot,this.tab_mot_tentative);
  })
  
  changeColor(nb_tentative : number){
    this.tab_mot_tentative[nb_tentative].forEach((lettre,i) => {
      if (this.mot()[i]==lettre.value) {
        lettre.exist = true;
        lettre.checkPosition = true
      }
      else if (this.mot().includes(lettre.value??="")) {
        lettre.checkPosition = false;
        lettre.exist = true;
      }
    });
  }

  checkColor(lettre : Letter){
    if (lettre.exist && lettre.checkPosition) {
      return "red"
    }
    else if (lettre.exist && lettre.checkPosition==false) {
      return "yellow"
    }
    else{
      return "blue"
    }
  }

  checkPosition(motADeviner : string , motDuJoueur : Array<Letter>){
    // motDuJoueur == motADeviner ?
    motDuJoueur.forEach((lettre,i) => {
      if (motADeviner[i] == lettre.value) {
        console.log(i);
        const lettre : Letter = {
          value : motADeviner[i],
          exist : false,
          checkPosition : false
        }
        // Save the letter that are the same
        this.my_mot[i] = lettre;
      }
    });

    console.log(this.my_mot);
    console.log(this.tab_mot_tentative[this.nb_tentaive+1]);
    // Print my_mot to the next line only
    const nextLine = this.tab_mot_tentative[this.nb_tentaive+1] = this.my_mot;
    // nextLine.forEach((lettre,i) => {
    //   lettre.value = this.my_mot[i].value
    //   console.log(this.my_mot[i].value,lettre.value,i)
    //   // if (lettre.value == undefined) {
    //   //   lettre.value = " "
    //   // }
    // });

    console.log(this.my_mot);
    console.log(this.tab_mot_tentative[this.nb_tentaive+1]);
  }

  checkVictory(motADeviner : string , motDuJoueur : Array<Letter>){
    let test = 0;
    motDuJoueur.forEach((lettre,i) => {
      if (motADeviner[i]==lettre.value) {
        test++
      }
    });
    if (test == motADeviner.length) {
      console.log("GAGNER");
    }
  }

  onKeyDown(event : KeyboardEvent){
    if (/^[a-zA-Z]$/.test(event.key) && this.indexMyMot < this.mot().length) {
      const lettre : Letter = {
      value : event.key,
      exist : false,
      checkPosition : false
      }
      //MONTRER A MASSI ET DEMANDE PK QUAND JE CHANGE EN METTANT .VALUE CA BUG
      this.tab_mot_tentative[this.nb_tentaive][this.indexMyMot] = lettre;
      this.indexMyMot++
    }
    else if (event.key == "Backspace") {
      const length = this.tab_mot_tentative[this.nb_tentaive].length;
      // const lettre : Letter ={
      //   value : " ",
      //   exist : false,
      //   checkPosition : false
      // }
      this.tab_mot_tentative[this.nb_tentaive][this.indexMyMot-1] = this.lettreVide
      if (this.indexMyMot !=0) {
        this.indexMyMot--
      }
    }
    else if (event.key == "Enter") {
      if (this.indexMyMot == this.mot().length) {
        this.changeColor(this.nb_tentaive)
        this.checkPosition(this.mot(),this.tab_mot_tentative[this.nb_tentaive]);
        this.checkVictory(this.mot(),this.tab_mot_tentative[this.nb_tentaive])
        this.nb_tentaive++;
        this.indexMyMot=0;
      }
      else{
        console.log(this.indexMyMot)
        console.log(this.tab_mot_tentative)
        console.log("enter mais length pas ok");
      }
    }











  //   if (event.key == "Enter") {
  //     console.log("enter");
  //   }
  //   if (event.key == "Backspace") {
  //     const length = this.tab_mot_tentative[this.nb_tentaive].length;
  //     this.tab_mot_tentative[this.nb_tentaive].slice(length-1,length);
  //     if (this.indexMyMot !=0) {
  //       this.indexMyMot--
  //     }
  //     console.log(this.indexMyMot);
  //   }
  //   else if(this.indexMyMot == this.mot().length){
  //     console.log("okkkkk")
  //   }
  //   else{
  //     const lettre : Letter = {
  //       value : event.key,
  //       exist : false,
  //       checkPosition : false
  //     }
  //     // this.my_mot = this.my_mot.concat(lettre)
  //     //MONTRER A MASSI ET DEMANDE PK QUAND JE CHANGE EN METTANT .VALUE CA BUG
  //     this.tab_mot_tentative[this.nb_tentaive][this.indexMyMot] = lettre;
  //     this.indexMyMot++
  //     console.log(this.tab_mot_tentative)
  //     console.log(this.nb_tentaive);
  //   }
  }
}
