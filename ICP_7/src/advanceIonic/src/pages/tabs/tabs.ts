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
  public navigateToSignIn(){
    this.navCtrl.setRoot(signInPage);
    console.log("Sign-out successful.");
  }
  public signOut(){
    console.log("sign out called");
    this.navigateToSignIn();
    // this.firebase.auth.signOut().then(function() {
    //   navigateToSignIn();
    //
    // }).catch(function(error) {
    //   console.log("An error happened."+ error.message);
    // });
  }
}
