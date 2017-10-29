import {Component} from '@angular/core';
import * as localforage from "localforage";
import {NavParams, ViewController} from "ionic-angular";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {SQLite, SQLiteObject} from "@ionic-native/sqlite";
import {Dialogs} from "@ionic-native/dialogs";
import {SocialSharing} from "@ionic-native/social-sharing";
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';
import {File} from "@ionic-native/file";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
})
export class NotesComponent{

  sessionId;
  noteToAdd : any = {};
  notes = [];

  constructor(private navParams: NavParams,
              public viewCtrl: ViewController,
              private camera: Camera,
              private sqlite: SQLite,
              private dialogs: Dialogs,
              private socialSharing: SocialSharing,
              private mediaCapture: MediaCapture,
              private file: File) {
    this.sessionId = navParams.get('sessionId');
    let that = this;
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {

        //create table section
        db.executeSql('CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT,sessionId, note, imageBase64, video, audio)', {})
          .then()
          .catch(e => console.log(e));
        //data insert section

        this.refreshNotes();
      })
  }

  addCurrentNote(){
    console.log('addCurrentNote', this.noteToAdd, this.sessionId);
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {

        //data insert section
        db.executeSql('INSERT INTO notes(sessionId, note, imageBase64, video, audio) VALUES(?,?,?,?,?)',
          [this.sessionId, this.noteToAdd.note, this.noteToAdd.imageBase64, this.noteToAdd.video, this.noteToAdd.audio])
          .then()
          .catch(e => console.log(e));

        this.noteToAdd = {};
        //data insert section
        this.refreshNotes();
      })
      .catch(e => alert(JSON.stringify(e)));
  }

  deleteNote(note){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {

        //data insert section
        db.executeSql('DELETE FROM notes WHERE id=?', [note.id])
          .then()
          .catch(e => console.log(e));
        this.refreshNotes();


      })
      .catch(e => alert(JSON.stringify(e)));
  }

  addPictureFromGallery(){
    this.camera.getPicture({
      quality: 100,
      targetWidth : 200,
      targetHeight : 200,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE,
      destinationType: this.camera.DestinationType.DATA_URL
    }).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      this.noteToAdd.imageBase64 = "data:image/jpeg;base64," + imageData;
    }, (err) => {
      // Handle error
      console.log(err);
    });
  }

  addPictureFromCamera(){
    this.camera.getPicture({
      quality: 100,
      targetWidth : 200,
      targetHeight : 200,
      sourceType: this.camera.PictureSourceType.CAMERA,
      mediaType: this.camera.MediaType.PICTURE,
      destinationType: this.camera.DestinationType.DATA_URL
    }).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      this.noteToAdd.imageBase64 = "data:image/jpeg;base64," + imageData;
      console.log(this.noteToAdd);
    }, (err) => {
      // Handle error
      console.log(err);
    });
  }

  closeNotes(){
    this.viewCtrl.dismiss();
  }

  openPicturePopUp(note){
    this.dialogs.confirm('What do you want to do with this image ?', 'Image',  ['Share','Remove', 'Cancel'])
      .then((action) => {
        switch (action) {
          case 1:
            this.shareViaSms(note);
            break;
          case 2:
            note.imageBase64 = null;
            this.updateNote(note);
            break;
          case 3:
            break;
        }
      })
      .catch(e => console.log('Error displaying dialog', e));
  }

  private updateNote(note: any) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        console.log(note);
        //data insert section
        db.executeSql('UPDATE notes SET imageBase64 = ?, video = ?, audio = ? WHERE ID = ?',
          [note.imageBase64, note.video, note.audio, note.id])
          .then()
          .catch(e => console.log(e));
        //data insert section
        this.refreshNotes();
      })
      .catch(e => alert(JSON.stringify(e)));

  }

  private shareViaSms(note: any) {
    this.socialSharing.shareViaFacebook('Bouhoou', note.imageBase64, 'Heyhyehy').then(res => console.log(res));
  }

  recordAudio(note: any) {
    // TODO TO BE FIXED !
    this.mediaCapture.captureAudio({ limit: 1, duration: 3 })
  }

  recordVideo(note: any) {
    this.mediaCapture.captureVideo({ limit: 1 })
      .then(
        (data: MediaFile[]) => {
          console.log(data);
          note.video = data[0].fullPath;
          this.updateNote(note);

        },
        (err: CaptureError) => console.error(err)
      );
  }

  private refreshNotes() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {

        this.notes = [];
        db.executeSql('SELECT * FROM notes WHERE sessionId=?', [this.sessionId])
          .then((results) => {
            console.log('GET ALL NOTES ', this.sessionId);
            for (var i = 0; i < results.rows.length; i++) {
              let note = results.rows.item(i);
              if(note.video) {
                const fullPathSplit = note.video.split('/');
                const fileName = fullPathSplit[fullPathSplit.length - 1];
                const directoryUrl = note.video.replace('/' + fileName, '');
                this.file.resolveDirectoryUrl(directoryUrl)
                  .then((directoryEntry) => {
                    console.log(directoryEntry);
                    // let fileName = str.split(" ");
                    this.file.getFile(directoryEntry, fileName, null)
                      .then(videoFile => {
                        console.log(videoFile);
                        videoFile.nativeURL ? note.video = videoFile.nativeURL : note.video = null;
                      }).catch(error => console.log(error));
                  });
              }

              this.notes.push(note);
            }
            console.log(this.notes);
          })
          .catch(e => console.log(e));
      })
  }
}
