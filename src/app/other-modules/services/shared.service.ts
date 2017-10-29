import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class SharedService {

  // ARTICLES
  private showBookmarks : Subject<boolean> = new BehaviorSubject<boolean>(null);
  public _sharedShowBookmarks = this.showBookmarks.asObservable();

  setShowBookmarks(showBookmarks){
    this.showBookmarks.next(showBookmarks);
  }

}
