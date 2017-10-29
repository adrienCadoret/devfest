import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";

@Injectable()
export class SessionsService {


  getAllSessions() : any {
    // TODO
    return window.fetch('https://raw.githubusercontent.com/DevInstitut/conference-data/master/sessions.json')
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        // TODO Serialize
        let sessions = [];
        for (var key in json){
          json[key]['image'] = 'https://devfest.gdgnantes.com/' + json[key]['image'];
          sessions.push(json[key]);
        }
        console.log('sessions', sessions);
        return sessions;
      }).catch(function(ex) {
        console.log('parsing failed getAllSessions', ex)
      })

  }

  getSessionsBySpeaker(speakerId) : any {
    // TODO
    console.log('getSessionsBySpeaker', speakerId);
    return window.fetch('https://raw.githubusercontent.com/DevInstitut/conference-data/master/sessions.json')
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        let sessions = [];
        for (var key in json){
          if(json[key]['speakers']
            && json[key]['speakers'].filter(id => speakerId.toString() === id.toString()).length > 0) {
            json[key]['image'] = 'https://devfest.gdgnantes.com/' + json[key]['image'];
            sessions.push(json[key]);
          }
        }
        return sessions;
      }).catch(function(ex) {
        console.log('parsing failed getSessionsBySpeaker', ex)
      })

  }

  getSessionById(sessionId)  : any {
    console.log('getSessionById :' + sessionId);
    return window.fetch('https://raw.githubusercontent.com/DevInstitut/conference-data/master/sessions.json')
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        // TODO Filter File
        for (var key in json){
          if(key === sessionId){
            console.log('Session with', sessionId, json[key]);
            json[key]['image'] = 'https://devfest.gdgnantes.com/' + json[key]['image'];
            return json[key];
          }
        }
        return false;
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      })
  }



}
