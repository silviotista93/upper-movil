import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-list-subscripciones',
  templateUrl: './list-subscripciones.page.html',
  styleUrls: ['./list-subscripciones.page.scss'],
})
export class ListSubscripcionesPage implements OnInit {

  sliderConfig = {
    spaceBetween: 20,
    centeredSlides: false,
    slidesPerView: 1.2
  };

  constructor(
    private navCtrl: NavController,
    private statusBar: StatusBar
  ) { }

  ngOnInit() {
    this.statusBar.hide();
  }
  atras() {
    this.navCtrl.back();
    this.statusBar.show();
  }

  abriPaymet() {
    this.navCtrl.navigateForward('/menu/paymet');
  }
}
