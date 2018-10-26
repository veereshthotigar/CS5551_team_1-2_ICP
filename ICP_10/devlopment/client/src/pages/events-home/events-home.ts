import { Component } from '@angular/core';
import {  NavController } from 'ionic-angular';
import { EventsRegisterPage } from '../events-register/events-register';
import { EventsJoinPage } from '../events-join/events-join';
import { EventPage } from '../event/event';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'page-events-home',
  templateUrl: 'events-home.html',
})
export class EventsHomePage {
  public created_by:string;
  public url:string;
  public result:Observable<any>;
  constructor(public navCtrl: NavController,private http: HttpClient,private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if(user) this.created_by = user.email;
      else this.created_by = 'admin';
      this.loadevents(this.created_by);
    })
  }
  refresh() {
    this.loadevents(this.created_by);
  }
  addEvent(){
    this.navCtrl.push(EventsRegisterPage);
  }
  joinEvent(){
    this.navCtrl.push(EventsJoinPage);
  }
  event(ID:string){
    this.navCtrl.push(EventPage,{id:ID});
  }
  loadevents(name:string){
    this.url = 'http://127.0.0.1:3000/events/search/users?user=true&searchtext='+name;
    this.http.get(this.url)
      .subscribe(
        (res:any)=>{
          this.result = res.data;
          console.log(this.result);
        }
      )
  }
  // ngOnInit() {
    
    
  // }
}
