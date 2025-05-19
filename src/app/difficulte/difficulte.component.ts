import { Component, inject } from '@angular/core';
import { GameService } from '../service/game.service';

@Component({
  selector: 'app-difficulte',
  imports: [],
  templateUrl: './difficulte.component.html',
  styleUrl: './difficulte.component.css'
})
export class DifficulteComponent {
  gameService = inject(GameService)
  tab_difficulte = ["facile","intermédiaire","moyen","difficile","hardcore"];
  looseFocus(event : any) {
    event.target.blur()
  }
}
