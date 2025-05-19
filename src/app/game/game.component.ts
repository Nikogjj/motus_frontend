import { Component, HostListener, inject } from '@angular/core';
import { GameService } from '../service/game.service';
import { RowComponent } from '../row/row.component';
import { InputrowComponent } from '../inputrow/inputrow.component';
import { KeyboardComponent } from '../keyboard/keyboard.component';
import { DifficulteComponent } from '../difficulte/difficulte.component';
import { PopUpEndComponent } from '../pop-up-end/pop-up-end.component';

@Component({
  selector: 'app-game',
  imports: [RowComponent,PopUpEndComponent,InputrowComponent,KeyboardComponent,DifficulteComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  gameService = inject(GameService);

  grilleDeMot = this.gameService.grilleDeMot;

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    const key = event.key;
    this.gameService.handleKeyDown(key);
    
  }

  onVirtualKeyPress(key :string){
    this.gameService.handleKeyDown(key)
  }
}
