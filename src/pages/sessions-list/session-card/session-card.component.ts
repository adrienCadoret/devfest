import {Component, Input, OnInit} from '@angular/core';
import {SessionDetailComponent} from "../../session-detail/session-detail.component";
import {NavController} from "ionic-angular";
import * as localforage from "localforage";
import {SharedService} from "../../../app/other-modules/services/shared.service";


@Component({
  selector: 'app-session-card',
  templateUrl: './session-card.component.html',
})
export class SessionCardComponent implements OnInit{

  @Input() session;
  favourites;
  toShow = true;

  constructor(private navCtrl : NavController,
              private sharedService : SharedService) {
    this.sharedService._sharedShowBookmarks.subscribe(value => {
      if(this.session) {
        if (value && this.session.favourite) this.toShow = true;
        else if (value && !this.session.favourite) this.toShow = false;
        else this.toShow = true;
      }
    })
  }

  ngOnInit(): void {
    let that = this;
    if(this.session) {
      localforage.getItem('favourites').then(function (favourites: any) {
        if (favourites) {
          that.favourites = favourites;
          let currentSession = that.favourites.filter(favourite => favourite.sessionId === that.session.id);
          if (currentSession.length > 0) {
            that.session.favourite = currentSession[0].favourite
          }
        } else {
          that.session.favourite = false;
        }
      }).catch(function (err) {
        console.log(err);
      });
    }
  }

  goToDetailRoad(id, event?){
    if(event.target.className.indexOf('icon') < 0)
      this.navCtrl.push(SessionDetailComponent, {
        sessionId: id
      });
  }

  changeFavourite(){
    let that = this;
    localforage.getItem('favourites').then( (favourites: any) => {
      that.favourites = favourites;
      that.session.favourite = !that.session.favourite;
      if(!that.favourites) {
        that.favourites = [];
        that.favourites.push({
          'sessionId': that.session.id,
          'favourite': that.session.favourite
        })
      } else {
        let currentSession = that.favourites.filter(favourite => favourite.sessionId === that.session.id);
        if(currentSession.length > 0){
          that.favourites.map(favourite => {
            if(favourite.sessionId === that.session.id){
              favourite.favourite = that.session.favourite;
            }
          })
        }else {
          that.favourites.push({
            'sessionId': that.session.id,
            'favourite': that.session.favourite
          })
        }
      }
      localforage.setItem('favourites', that.favourites);
    });
  }

}
