import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../service/app.service';
import { AuthService } from '../service/auth.service';
import { GameService } from '../service/game.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  router = inject(Router);
  appService=inject(AppService);
  authService = inject(AuthService);
  gameService = inject(GameService);
  
  async deconnexion(){
    const token = localStorage.getItem("token");
    await this.authService.logout(token)
    .then(res=>{
      if (res.error == "none") {
        localStorage.removeItem("token");
        this.router.navigate(["login"])
      }
      else{
        console.log(res.error)
      }
    })
    .catch(error=>console.log(error));
    this.gameService.restartGame();
  }
}
