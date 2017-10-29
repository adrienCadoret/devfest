import { Component } from '@angular/core';
import {NavController} from "ionic-angular";
import {SessionsService} from "../../app/other-modules/services/sessions.service";
import {SchedulesService} from "../../app/other-modules/services/schedules.service";
import * as localforage from "localforage";
import {SharedService} from "../../app/other-modules/services/shared.service";
import {SharedVariablesService} from "../../app/other-modules/services/network-checker.service";

@Component({
  selector: 'app-sessions-list',
  templateUrl: './sessions-list.component.html'
})
export class SessionsListComponent{

  sessions : any = [];
  favourites : any;
  schedules : any = [];
  public showBookmarks;

  constructor(public navCtrl: NavController,
              private sessionsService : SessionsService,
              private scheduleService : SchedulesService,
              private sharedService : SharedService,
              public networkService : SharedVariablesService) {
    this.sharedService.setShowBookmarks(false);
    this.refreshView();
    networkService._sharedRefreshView.subscribe(() => this.refreshView());
  }

  getSession(sessionId){
    return this.sessions.filter(session => session.id.toString() === sessionId.toString())[0];
  }

  changeShowBookmarks(bool){
    console.log(bool);
    this.sharedService.setShowBookmarks(bool);
  }

  refreshView(){
    this.sessionsService.getAllSessions().then(data => {
      this.sessions = data;
      console.log(this.sessions);

      this.scheduleService.getSchedule().then(schedules => {
        this.schedules = schedules;
      })
    });
  }
}
