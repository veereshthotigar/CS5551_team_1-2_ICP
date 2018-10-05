import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { signInPage } from '../signIn/signIn';
@Component({
  selector: 'page-signUp',
  templateUrl: 'signUp.html'
})
export class signUpPage {

    goAnOtherPage() {
      this.navCtrl.setRoot(signInPage);
    }
  constructor(public navCtrl: NavController) {

  }

}
