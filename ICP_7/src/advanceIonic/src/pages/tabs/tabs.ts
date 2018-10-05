import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { signInPage } from '../signIn/signIn';

//authDomain
import { AngularFireAuth } from "angularfire2/auth";
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(private firebase: AngularFireAuth,public navCtrl: NavController) {
      this.firebase = firebase;
      this.navCtrl = navCtrl;
  }

  signOut(){
    console.log("sign out called");
    this.navCtrl.setRoot(signInPage);
    // this.firebase.auth().signOut().then(function() {
    //   console.log("Sign-out successful.");
    // }).catch(function(error) {
    //   console.log("An error happened.");
    // });
  }
}
