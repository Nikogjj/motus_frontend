import { Component, inject } from '@angular/core';
import { AppService } from '../service/app.service';
import { Rank } from '../interfaces/rank';
import { CommonModule } from '@angular/common';
import { UserInfos } from '../interfaces/user-infos';

@Component({
  selector: 'app-ranking',
  imports: [CommonModule],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css'
})
export class RankingComponent {
  appService = inject(AppService);
  tab_ranking : Array <Rank> = [];
  scoreUser : UserInfos = {
    pseudo : "",
    score : 0
  }
  async ngOnInit(){
    this.tab_ranking = await this.appService.getRanking()
    await this.appService.getInfosUser()
    .then(userInfos => {
      this.scoreUser.pseudo = userInfos.pseudo;
      this.scoreUser.score = userInfos.score;
    })
  }
}