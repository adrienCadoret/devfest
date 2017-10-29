import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class SharedVariablesService {

  private availableConnection : Subject<boolean> = new BehaviorSubject<boolean>(null);
  public _sharedAvailableConnection = this.availableConnection.asObservable();

  private refreshView : Subject<boolean> = new BehaviorSubject<boolean>(null);
  public _sharedRefreshView = this.refreshView.asObservable();

  constructor() {
    console.log('Listening the internet connection...')
    this.setAvailableConnection(navigator.onLine);
    this.listenToInternetConnection();
  }

  private listenToInternetConnection() {
    window.addEventListener('online', () => {
      console.log('online');
      this.setAvailableConnection(true);
    });
    window.addEventListener('offline', () => {
      console.log('offline');
      this.setAvailableConnection(false);
    });
  }

  setAvailableConnection(hasConnection){
    this.availableConnection.next(hasConnection);
  }

  runRefresh(bool){
    this.refreshView.next(bool);
  }

}
