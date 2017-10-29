import { Component, Input } from '@angular/core';
import {NavController} from "ionic-angular";
import {SpeakerDetailComponent} from "../../speaker-detail/speaker-detail.component";

@Component({
  selector: 'app-speaker-card',
  templateUrl: './speaker-card.component.html',
})
export class SpeakerCardComponent{

  @Input() speaker;

  constructor(public navCtrl: NavController) {

  }

  goToDetailRoad(id){
    this.navCtrl.push(SpeakerDetailComponent, {
      speakerId: id
    });  }

}
