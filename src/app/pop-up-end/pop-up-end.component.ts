import { Component, inject } from '@angular/core';
import { GameService } from '../service/game.service';
import { AppService } from '../service/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pop-up-end',
  imports: [],
  templateUrl: './pop-up-end.component.html',
  styleUrl: './pop-up-end.component.css'
})
export class PopUpEndComponent {
  gameService = inject(GameService)
  appService = inject(AppService)
  router = new Router()
  pseudo : string = this.gameService.pseudo;
  score : number = this.gameService.score;
  scoreWin : number = 0;
  async getInfosUser(){
    switch (this.gameService.motATrouverInfo.difficulte) {
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
  }
  ngOnInit(){
    this.getInfosUser()
  }
}
