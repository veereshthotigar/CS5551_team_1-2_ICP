import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

// login and registration
import { signInPage } from '../pages/signIn/signIn';
import { signUpPage } from '../pages/signUp/signUp';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//firebase
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireModule } from "angularfire2";

//native plugins
import { Camera } from '@ionic-native/camera';

// Initialize Firebase
export const firebaseConfig = {
    apiKey: "AIzaSyAzZT0RI1MQf--tTBp_AQ7qwr0wcMuXJG8",
    authDomain: "myapp-ceed1.firebaseapp.com",
    databaseURL: "https://myapp-ceed1.firebaseio.com",
    projectId: "myapp-ceed1",
    storageBucket: "myapp-ceed1.appspot.com",
    messagingSenderId: "822624922951"
};

@NgModule({
  declarations: [
    MyApp,
    signInPage,
    signUpPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    signInPage,
    signUpPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    Camera,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
