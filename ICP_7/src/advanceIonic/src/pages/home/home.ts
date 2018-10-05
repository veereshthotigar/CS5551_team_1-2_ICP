import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase} from "angularfire2/database";
import { AngularFireAuth } from 'angularfire2/auth';
import { Camera } from '@ionic-native/camera';
import { Observable } from 'rxjs';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  image = {};
  Images : Observable<any>;
  userId: string;

  constructor(public navCtrl: NavController,private camera: Camera,public fireDatabase: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.camera = camera;
    this.fireDatabase = fireDatabase;
    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid;
      this.Images = fireDatabase.list(`users/${this.userId}/Images`).valueChanges();
      console.log(this.userId);
    })

    console.log(this.Images);
  }

  clickSnap(){
    console.log("camera is called");
    this.camera.getPicture({
      quality : 15,
      destinationType : this.camera.DestinationType.DATA_URL,
      sourceType : this.camera.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: false
   }).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     this.image = {data:base64Image}
     this.fireDatabase.list(`users/${this.userId}/Images`).push(this.image);
    }, (err) => {
     // Handle error
    });
  }
}
