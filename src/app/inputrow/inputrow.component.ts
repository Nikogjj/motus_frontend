import { Component, inject, input } from '@angular/core';
import { GameService } from '../service/game.service';
import { Letter } from '../interfaces/letter';

@Component({
  selector: 'app-inputrow',
  imports: [],
  templateUrl: './inputrow.component.html',
  styleUrl: './inputrow.component.css'
})
export class InputrowComponent {
  gameServices = inject(GameService);
  index = input.required<number>();
  mot : Array <Letter> = [];

  // ngOnInit(){
  //   this.mot = this.gameServices.getMotFromGrilleBonnePosition(this.index())
  // }
}
