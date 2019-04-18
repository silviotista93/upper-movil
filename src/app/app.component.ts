import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Solicitar Servicio',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Subscripciones',
      url: '/subscripcion',
      icon: 'subscripcion'
    },
    {
      title: 'Historial',
      url: '/historial',
      icon: 'historial'
    },
    {
      title: 'Mis Autos',
      url: '/autos',
      icon: 'autos'
    },
    {
      title: 'Contacto',
      url: '/contacto',
      icon: 'contacto'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
    });
  }

  pushPerfil() {
    this.navCtrl.navigateForward('/cuenta');
  }
}
