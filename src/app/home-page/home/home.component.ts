import { Component, inject } from '@angular/core';
import { AppService } from '../../service/app.service';
import { Router, RouterOutlet } from '@angular/router';
import { RulesComponent } from '../../rules/rules.component';

@Component({
  selector: 'app-home',
  imports: [RulesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  appServices = inject(AppService);
  page = 3;
  constructor (private router : Router){
  }
  // deconnexion(){
  //   localStorage.removeItem("token")
  //   this.router.navigate(["login"])
  // }
  displayRanking(){
    this.page = 2;
  }
  displayRules(){
    this.page = 1;
  }
  resetDisplay(){
    this.page=0
  }

}
