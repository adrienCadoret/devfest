import { Component, OnInit } from '@angular/core';
import {SpeakersService} from "../../app/other-modules/services/speakers.service";
import {SharedVariablesService} from "../../app/other-modules/services/network-checker.service";

@Component({
  selector: 'app-speakers-list',
  templateUrl: './speakers-list.component.html',
})
export class SpeakersListComponent{

  speakers = [];

  constructor(private speakersService : SpeakersService,
              public networkService : SharedVariablesService) {
    networkService._sharedRefreshView.subscribe(() => this.refreshView());
  }

  ngOnInit() {
    this.refreshView();
  }

  refreshView(){
    this.speakersService.getAllSpeakers().then(data => this.speakers = data);
  }

}
