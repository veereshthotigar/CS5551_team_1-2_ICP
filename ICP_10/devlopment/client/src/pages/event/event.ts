import { Component } from '@angular/core';
import { NavController,NavParams  } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {
  public eventId:Number;
  public created_by:string;
  constructor(public navCtrl: NavController,public params:NavParams,private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if(user) this.created_by = user.email;
      else this.created_by = 'admin';
    })
    this.eventId = params.get('id');
    console.log(this.eventId);
  }
}
