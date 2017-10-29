import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotesService} from "./notes.service";
import {SessionsService} from "./sessions.service";
import {SpeakersService} from "./speakers.service";
import {SchedulesService} from "./schedules.service";
import {SharedVariablesService} from "./network-checker.service";
import {SharedService} from "./shared.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    NotesService,
    SessionsService,
    SpeakersService,
    SchedulesService,
    SharedVariablesService,
    SharedService
  ]
})
export class ServicesModule { }
