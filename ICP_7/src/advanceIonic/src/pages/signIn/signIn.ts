import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { signUpPage } from '../signUp/signUp';
@Component({
  selector: 'page-signIn',
  templateUrl: 'signIn.html'
})
export class signInPage {

  signIn() {
    this.navCtrl.push(TabsPage);
  }
  register() {
    this.navCtrl.push(signUpPage);
  }
  constructor(public navCtrl: NavController) {

  }

}
