import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import Keyboard from 'simple-keyboard';

@Component({
  selector: 'app-keyboard',
  imports: [CommonModule],
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.css'
})
export class KeyboardComponent {
  @Output() keyPressed = new EventEmitter<string>();

  keyboardRows = [
    ['A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',"ü","û"],
    ['Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M',"é","è"],
    ['←', 'W', 'X', 'C', 'V', 'B', 'N',"ö","ô","ï","î",'⏎']
  ];

  onKeyClick(key: string) {
    this.keyPressed.emit(key);
  }
}
