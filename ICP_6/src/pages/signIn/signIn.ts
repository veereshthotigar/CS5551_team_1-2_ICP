import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SignUpPage } from '../signUp/signUp';
@Component({
  selector: 'page-signIn',
  templateUrl: 'signIn.html'
})
export class SignInPage {

  signIn() {
    this.navCtrl.push(HomePage);
  }
  register() {
    this.navCtrl.push(SignUpPage);
  }
  constructor(public navCtrl: NavController) {

  }

}
