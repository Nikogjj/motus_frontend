import { Component, inject } from '@angular/core';
import { MotusComponent } from '../motus/motus.component';
import { AppService } from '../../service/app.service';

@Component({
  selector: 'app-home',
  imports: [MotusComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  appServices = inject(AppService);
  motAfficher = "";
  ngOnInit(){
    this.appServices.getRandomMot()
    .then(res=>{
      this.motAfficher = res.mot
      console.log(this.motAfficher)
    })
  }
}
