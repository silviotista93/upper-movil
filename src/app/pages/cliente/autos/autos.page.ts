import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-autos',
  templateUrl: './autos.page.html',
  styleUrls: ['./autos.page.scss'],
})
export class AutosPage implements OnInit {

  constructor(private navCtrl: NavController ) { }

  ngOnInit() {
  }

  pushAgregarAuto() {
    this.navCtrl.navigateForward('/agregar-auto');
  }
}
