import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, inject, Output } from '@angular/core';
import Keyboard from 'simple-keyboard';
import { GameService } from '../service/game.service';

@Component({
  selector: 'app-keyboard',
  imports: [CommonModule],
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.css'
})
export class KeyboardComponent {
  @Output() keyPressed = new EventEmitter<string>();
  gameService = inject(GameService);

  keyboardRows = [
    ['A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',"ü","û"],
    ['Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M',"é","è"],
    ['←', 'W', 'X', 'C', 'V', 'B', 'N',"ö","ô","ï","î",'⏎']
  ];
  
  looseFocus(event : any) {
    event.target.blur()
  }

  onKeyClick(key: string,click : Event) {
    switch (key) {
      case "⏎":
        key="Enter";
        this.keyPressed.emit(key)
        break;
      case "←":
        key="Backspace"
        this.keyPressed.emit(key)
        break;
      default:
        this.keyPressed.emit(key)
        break;
    }
  }
}
