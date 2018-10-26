import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//firebase
import {AngularFireAuth} from "angularfire2/auth";

@Component({
  selector: 'page-events-register',
  templateUrl: 'events-register.html',
})

export class EventsRegisterPage {
  public eventName:string;
  public eventStartDate:Date;
  public eventEndDate:Date;
  public address_one:string;
  public address_two:string;
  public address_city:string;
  public address_state:string;
  public address_zipcode:number;
  public created_by:string;
  public url:string;
  public message:Observable<any>;
  public userlist:string[];
  constructor(public navCtrl: NavController,private http: HttpClient,private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if(user) this.created_by = user.email;
      else this.created_by = 'admin';
      this.userlist = [this.created_by];
    })
  }
  createEvent(){
    this.url = 'http://127.0.0.1:3000/event/create';
    this.http.post(this.url,{
      eventName:this.eventName,
      eventStartDate:this.eventStartDate,
      eventEndDate:this.eventEndDate,
      address_one:this.address_one,
      address_two:this.address_two,
      address_city:this.address_city,
      address_state:this.address_state,
      address_zipcode:this.address_zipcode,
      users_list:this.userlist,
      created_by:this.created_by
    })
      .subscribe(
        (res:any)=>{
          this.message = res.message;
          alert(this.message);
          this.navCtrl.pop();
          console.log(this.message);
        }
      )
  }
  
}