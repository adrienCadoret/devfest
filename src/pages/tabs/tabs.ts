import { Component } from '@angular/core';
import {SessionsListComponent} from "../sessions-list/sessions-list.component";
import {SpeakersListComponent} from "../speakers-list/speakers-list.component";
import {DevicePage} from "../device/device";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  sessionRoot = SessionsListComponent;
  speakerRoot = SpeakersListComponent;
  deviceRoot = DevicePage;

  constructor() {

  }
}
