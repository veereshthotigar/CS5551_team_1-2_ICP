import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {LoginPage} from '../login/login';
import { EventsHomePage } from '../events-home/events-home';
import { ReportsPage } from '../reports/reports';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = EventsHomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = ReportsPage;
  constructor(public navCtrl: NavController) {

  }
  public navigateToSignIn(){
    this.navCtrl.setRoot(LoginPage);
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
