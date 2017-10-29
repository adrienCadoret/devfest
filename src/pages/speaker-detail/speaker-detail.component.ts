import { Component} from '@angular/core';
import {NavController, NavParams} from "ionic-angular";
import {SessionDetailComponent} from "../session-detail/session-detail.component";
import {SessionsService} from "../../app/other-modules/services/sessions.service";
import {SpeakersService} from "../../app/other-modules/services/speakers.service";
import {Contacts, Contact, ContactField, ContactName, ContactOrganization} from '@ionic-native/contacts';
import {Toast} from "@ionic-native/toast";

@Component({
  selector: 'app-speaker-detail',
  templateUrl: './speaker-detail.component.html',
})
export class SpeakerDetailComponent {

  speaker;
  sessions;

  constructor(private navParams: NavParams,
              private navCtrl : NavController,
              private speakerService : SpeakersService,
              private sessionService : SessionsService,
              private contacts: Contacts,
              private toast: Toast) {
    let id = navParams.get('speakerId');
    this.speakerService.getSpeakerById(id.toString())
      .then(data => {
        this.speaker = data;
        return data;
      })
      .then(speaker => {
        this.sessionService.getSessionsBySpeaker(speaker.id).then(sessions => {
          this.sessions = sessions;
        })
      })
  }

  goToDetailSession(sessionId) {
    this.navCtrl.push(SessionDetailComponent, {
      sessionId: sessionId
    });
  }

  addToContacts(){

    let contact: Contact = this.contacts.create();
    contact.name = new ContactName(null, this.speaker.name, '');
    contact.organizations = [new ContactOrganization(this.speaker.company)];
    let sessionToString = '';
    this.sessions.map(session => sessionToString += session.title);
    contact.note = 'Sessions : ' + sessionToString;
    contact.save().then(
      () => this.toast.show(`Contact saved successfully`, '3000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      ),
      (error: any) => this.toast.show(`Error while saving contact`, '3000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      )
    );
  }
}
