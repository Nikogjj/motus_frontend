import { Component, inject, Injectable, input, InputSignal } from '@angular/core';
import { GameService } from '../service/game.service';
import { Mot } from '../interfaces/mot';
import { Letter } from '../interfaces/letter';

@Component({
  selector: 'app-row',
  imports: [],
  templateUrl: './row.component.html',
  styleUrl: './row.component.css'
})
export class RowComponent {
  gameServices = inject(GameService);
  index = input.required<number>();
  mot : Array <Letter> = [];
  
  checkDivColor(lettre : Letter){
    if (lettre.checkPosition) {
      return "red"
    }
    else if(lettre.checkPosition == false && lettre.exist){
      return "transparent"
    }
    else{
      return "white"
    }
  }

  checkPColor(lettre:Letter){
    if (lettre.checkPosition) {
      return "red"
    }
    else if(lettre.checkPosition == false && lettre.exist){
      return "yellow"
    }
    else{
      return "white"
    }
  }
}
