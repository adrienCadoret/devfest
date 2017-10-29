import {NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the SessionQuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-session-question',
  templateUrl: 'session-question.html',
})
export class SessionQuestionPage {

  questionToAdd = '';
  sessionId;
  questions : Observable<any[]>;
  questionsForSession = [];

  constructor(private db: AngularFireDatabase,
              private navParams: NavParams,
              public toastCtrl: ToastController,
              public viewCtrl: ViewController) {
    this.sessionId = navParams.get('sessionId');
    this.questions = db.object('questions').valueChanges();
    this.questions.subscribe((res : any) => {
      this.questionsForSession = [];
      // let questions = JSON.parse(res);
      // console.log(questions);
      for (var key in res) {
        console.log(key, res[key]);
          if(res[key].sessionId === this.sessionId) this.questionsForSession.push(res[key]);

      }
      // res.forEach(question => {
      //   console.log(question);
      //   if(question.sessionId === this.sessionId) this.questionsForSession.push(question);
      // });
      console.log(this.questionsForSession);
    } )
  }

  addQuestion(){
    // TODO Call Firebase and Toast;
    console.log(this.questionToAdd);
    const questionRef = this.db.list('questions');
    questionRef.push({ string: this.questionToAdd, sessionId: this.sessionId});
    let toast = this.toastCtrl.create({
      message: 'Your question has just been posted',
      duration: 3000,
      showCloseButton: true
    });
    toast.present();
  }

  close(){
    this.viewCtrl.dismiss();
  }



}
