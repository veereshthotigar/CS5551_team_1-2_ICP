import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignInPage } from '../signIn/signIn';
@Component({
  selector: 'page-signUp',
  templateUrl: 'signUp.html'
})
export class SignUpPage {
  
    goAnOtherPage() {
      this.navCtrl.setRoot(SignInPage);
    }
  constructor(public navCtrl: NavController) {

  }

}
