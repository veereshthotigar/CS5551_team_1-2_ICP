import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//firebase
import {AngularFireAuth} from "angularfire2/auth";
@Component({
  selector: 'page-events-join',
  templateUrl: 'events-join.html',
})
export class EventsJoinPage {
  public created_by:string;
  public url:string;
  public result:Observable<any>;
  public message:Observable<any>;
  constructor(public navCtrl: NavController,private http: HttpClient,private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if(user) this.created_by = user.email;
      else this.created_by = 'admin';
      this.loadevents(this.created_by);
    })
  }
  loadevents(name:string){
    this.url = 'http://127.0.0.1:3000/events/search/users?user=false&searchtext='+name;
    this.http.get(this.url)
      .subscribe(
        (res:any)=>{
          this.result = res.data;
          console.log(this.result);
        }
      )
  }
  joinTheEvent(name:string){
    this.url = 'http://127.0.0.1:3000/event/update/users';
    this.http.put(this.url,{
      event_name:name,
      user:this.created_by
    })
      .subscribe(
        (res:any)=>{
          this.message = res.message;
          this.loadevents(this.created_by);
          alert(this.message);
        }
      )
  }
}
