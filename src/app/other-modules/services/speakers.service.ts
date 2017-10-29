import { Injectable } from '@angular/core';

@Injectable()
export class SpeakersService {

  constructor() { }

  getAllSpeakers() : any {
    // TODO
    console.log('getAllSpeakers');
    return window.fetch('https://raw.githubusercontent.com/DevInstitut/conference-data/master/speakers.json')
      .then(function(response) {
        return response.json();
      }).then(function(json) {
      // TODO Serialize
      let speakers = [];
      for (var key in json){
        json[key]['photoUrl'] = 'https://devfest.gdgnantes.com/' + json[key]['photoUrl'];
        json[key]['companyLogo'] = 'https://devfest.gdgnantes.com/' + json[key]['companyLogo'];
        speakers.push(json[key]);
      }
      console.log('Speakers', speakers);
      return speakers;
    }).catch(function(ex) {
      console.log('parsing failed getAllSpeakers', ex)
    })

  }

  getSpeakerById(speakerId) : any {
    console.log('getSpeakerById :' + speakerId);
    return window.fetch('https://raw.githubusercontent.com/DevInstitut/conference-data/master/speakers.json')
      .then(function(response) {
        return response.json()
      }).then(function(json) {
      // TODO Filter File
      for (var key in json){
        if(key === speakerId) {
          console.log('Speaker with', speakerId, json[key]);
          json[key]['photoUrl'] = 'https://devfest.gdgnantes.com/' + json[key]['photoUrl'];
          json[key]['companyLogo'] = 'https://devfest.gdgnantes.com/' + json[key]['companyLogo'];
          return json[key];
        }
      }
      return false;
      }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }

}
