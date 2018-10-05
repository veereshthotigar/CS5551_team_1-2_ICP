import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { signInPage } from '../signIn/signIn';
//firebase
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";

@Component({
  selector: 'page-signUp',
  templateUrl: 'signUp.html'
})
export class signUpPage {

  //variables
  uname = "";
  fname ="";
  lname = "";
  password = "";
  cpassword = "";

  user = {};

  constructor(public navCtrl: NavController,private firebase: AngularFireAuth,public fireDatabase: AngularFireDatabase) {

  }
  register() {

    if(this.uname.valueOf() != "" && this.fname.valueOf() != "" && this.lname.valueOf() != "" && this.password.valueOf() != ""
      && this.cpassword.valueOf() != "")
    {
      if(this.password.valueOf() == this.cpassword.valueOf())
      {
        this.user = {
          uname:this.uname,
          fname: this.fname,
          lname: this.lname
        };
        this.firebase.auth.createUserWithEmailAndPassword(this.uname.valueOf(), this.password.valueOf()).then(data =>{
          this.fireDatabase.list('Users').push(this.user);
            console.log("Got data from Firebase: ", data);
            this.navCtrl.setRoot(signInPage);
          }).catch(error =>{
            console.log("error in registration : ", error);
          });
        }
        else
        {
          console.log("Passwords do not match");
        }
    }
    else
    {
      console.log("Please fill out all fields");
    }
  }
}
