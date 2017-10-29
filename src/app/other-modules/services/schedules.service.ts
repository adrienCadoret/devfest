import { Injectable } from '@angular/core';

@Injectable()
export class SchedulesService {

  getSchedule() : any {
    // TODO
    console.log('getSchedule');
    return window.fetch('https://raw.githubusercontent.com/DevInstitut/conference-data/master/schedule.json')
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        // TODO Serialize
        let schedules = [];
        for (var key in json){
          let schedule = {};
          schedule['date'] = json[key]['dateReadable'];
          schedule['timeslots'] = json[key]['timeslots'];
          schedules.push(schedule);
        }
        console.log('sessions', schedules);
        return schedules;
      }).catch(function(ex) {
        console.log('parsing failed getSchedule', ex)
      })

  }

}
