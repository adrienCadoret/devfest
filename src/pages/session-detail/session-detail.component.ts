import { Component} from '@angular/core';
import {ModalController, NavController, NavParams} from "ionic-angular";
import {SpeakersService} from "../../app/other-modules/services/speakers.service";
import {SessionsService} from "../../app/other-modules/services/sessions.service";
import {SpeakerDetailComponent} from "../speaker-detail/speaker-detail.component";
import {NotesComponent} from "./notes/notes.component";
import {SessionQuestionPage} from "../session-question/session-question";

@Component({
  selector: 'app-session-detail',
  templateUrl: './session-detail.component.html'
})
export class SessionDetailComponent{

  session;
  speakers = [];

  constructor(private navParams: NavParams,
              private navCtrl : NavController,
              public modalCtrl: ModalController,
              private sessionService : SessionsService,
              private speakerService: SpeakersService,) {
    let id = navParams.get('sessionId');
    this.sessionService.getSessionById(id.toString())
      .then(data => {
        this.session = data;
        return data;
      })
      .then(session => {
        if (this.session && this.session.speakers) {
          this.session.speakers.map(speakerId => {
            this.speakerService.getSpeakerById(speakerId.toString()).then(speaker =>{
              console.log(speaker);
              if(speaker) this.speakers.push(speaker);
            })
          })
        }
      });
  }

  goToDetailSpeaker(id) {
    this.navCtrl.push(SpeakerDetailComponent, {
      speakerId: id
    });
  }

  openNotes(){
    console.log('openNotes');
    let modal = this.modalCtrl.create(NotesComponent, {
      sessionId: this.session.id
    });
    modal.present();
  }

  openQuestions(){
    console.log('openQuestions');
    if(this.session) {
      let modal = this.modalCtrl.create(SessionQuestionPage, {
        sessionId: this.session.id
      });
      modal.present();
    }
  }
}
