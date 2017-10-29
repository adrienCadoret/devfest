import { Component } from '@angular/core';
import {Platform, ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import {SharedVariablesService} from "./other-modules/services/network-checker.service";
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = TabsPage;
  availableConnection;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              toastCtrl: ToastController,
              public networkService : SharedVariablesService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    let that = this;
    if ('serviceWorker' in navigator) {
      // enregistrement d'un service worker
      navigator.serviceWorker.register('service-worker.js')
        .then(function(registration) {
          console.log('Enregistrement Ok, le scope est :', registration.scope);
        })
        .catch(function(error) {
          console.log('Enregistrement Ko, erreur:', error);
        });
    }
    networkService._sharedAvailableConnection.subscribe(hasConnection => {
      this.availableConnection = hasConnection;
      console.log(this.availableConnection);
      if(this.availableConnection){
        let toast = toastCtrl.create({
          message: 'Your internet connection has just been back',
          duration: 5000,
          showCloseButton: true,
          closeButtonText: 'Refresh Data'
        });
        toast.present();
        toast.onDidDismiss(() =>{
          this.refreshData();
        })
      }
    })
  }

  private refreshData() {
    // if (navigator.serviceWorker.controller) {
    //   navigator.serviceWorker.controller.postMessage({
    //     "command": "FORCE_FETCH",
    //     "message": [
    //       'https://raw.githubusercontent.com/DevInstitut/conference-data/master/speakers.json',
    //       'https://raw.githubusercontent.com/DevInstitut/conference-data/master/sessions.json',
    //       'https://raw.githubusercontent.com/DevInstitut/conference-data/master/schedule.json'
    //     ]});
    // }
    this.networkService.runRefresh(true);
  }
}
