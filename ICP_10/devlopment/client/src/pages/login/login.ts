import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {RegisterPage} from '../register/register'
import {TabsPage} from '../tabs/tabs'
//authDomain
import { AngularFireAuth } from "angularfire2/auth";
import { auth } from 'firebase/app';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
@ViewChild('username') uname;
@ViewChild('password') pwd;
  constructor(public navCtrl: NavController, public navParams: NavParams,private firebase: AngularFireAuth) {
  }
  
  signIn(){
    var validate = true

    if(this.uname.value == "" || this.pwd.value == ""){
      alert("Please enter the credentials")
      validate= false
    }
    if (validate == true){
      this.firebase.auth.signInWithEmailAndPassword(this.uname.value, this.pwd.value).then(data => {
          console.log("Sign in successful");
          this.navCtrl.push(TabsPage);
      }).catch(error => {
        console.log("error in authentication : ", error);
        console.log(error.message);
      });
    }
  }

  register(){
  this.navCtrl.push(RegisterPage)
  }

}
