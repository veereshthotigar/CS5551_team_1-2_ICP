import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//authDomain
import { AngularFireAuth } from "angularfire2/auth";
//pages
import { TabsPage } from '../tabs/tabs';
import { signUpPage } from '../signUp/signUp';
@Component({
  selector: 'page-signIn',
  templateUrl: 'signIn.html'
})
export class signInPage {
  username ="";
  password ="";
  constructor(public navCtrl: NavController,private firebase: AngularFireAuth) {
    this.navCtrl = navCtrl;
    this.firebase = firebase;
  }
  testSignIn(){
    this.navCtrl.push(TabsPage);
  }
  signIn() {
    if (this.username.valueOf() != "" && this.password.valueOf() != "") {
      this.firebase.auth.signInWithEmailAndPassword(this.username.valueOf(), this.password.valueOf()).then(data => {
          console.log("got data from Firebase ", data);
          this.navCtrl.push(TabsPage);
      }).catch(error => {
        console.log("error in registeration : ", error);
        console.log(error.message);
      });
    }else
    {
      console.log("Please fill out all details!");
    }

  }

  //navigate to register page
  navToRegister() {
    this.navCtrl.push(signUpPage);
  }

}
