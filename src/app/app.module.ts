import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {SessionsListComponent} from "../pages/sessions-list/sessions-list.component";
import {ServicesModule} from "./other-modules/services/services.module";
import {SessionCardComponent} from "../pages/sessions-list/session-card/session-card.component";
import {SpeakersListComponent} from "../pages/speakers-list/speakers-list.component";
import {SpeakerCardComponent} from "../pages/speakers-list/speaker-card/speaker-card.component";
import {SessionDetailComponent} from "../pages/session-detail/session-detail.component";
import {NotesComponent} from "../pages/session-detail/notes/notes.component";
import {SpeakerDetailComponent} from "../pages/speaker-detail/speaker-detail.component";
import {DevicePage} from "../pages/device/device";
import {Device} from "@ionic-native/device";
import {Network} from "@ionic-native/network";
import {Camera} from "@ionic-native/camera";
import {SQLite} from "@ionic-native/sqlite";
import {Dialogs} from "@ionic-native/dialogs";
import {SocialSharing} from "@ionic-native/social-sharing";
import {MediaCapture} from "@ionic-native/media-capture";
import {File} from "@ionic-native/file";
import {Contact, Contacts} from "@ionic-native/contacts";
import {Toast} from "@ionic-native/toast";
import {SessionQuestionPage} from "../pages/session-question/session-question";
// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import {AngularFirestoreModule} from "angularfire2/firestore";
import {AngularFireDatabase, AngularFireDatabaseModule} from "angularfire2/database";

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyA7EdIc53G2at0yiU7OLl_t_nnv5VkR2Q4",
  authDomain: "devfestapp-adriencadoret.firebaseapp.com",
  databaseURL: "https://devfestapp-adriencadoret.firebaseio.com",
  projectId: "devfestapp-adriencadoret",
  storageBucket: "devfestapp-adriencadoret.appspot.com",
  messagingSenderId: "483973259821"
};
@NgModule({
  declarations: [
    MyApp,
    SessionsListComponent,
    TabsPage,
    SessionCardComponent,
    SpeakersListComponent,
    SpeakerCardComponent,
    SessionDetailComponent,
    NotesComponent,
    SpeakerDetailComponent,
    DevicePage,
    SessionQuestionPage
  ],
  imports: [
    BrowserModule,
    ServicesModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SessionsListComponent,
    TabsPage,
    SessionCardComponent,
    SpeakersListComponent,
    SpeakerCardComponent,
    SessionDetailComponent,
    NotesComponent,
    SpeakerDetailComponent,
    DevicePage,
    SessionQuestionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Device,
    Network,
    Camera,
    SQLite,
    Dialogs,
    SocialSharing,
    MediaCapture,
    File,
    Contacts,
    Toast,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
