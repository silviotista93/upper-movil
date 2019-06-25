import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-modal-alert-agregar-auto',
  templateUrl: './modal-alert-agregar-auto.page.html',
  styleUrls: ['./modal-alert-agregar-auto.page.scss'],
})
export class ModalAlertAgregarAutoPage implements OnInit {

  constructor( public modalCtrl: ModalController, public navCtrl: NavController) { }

  ngOnInit() {
  }
  abrirAgregarAuto() {
    this.navCtrl.navigateForward('/menu/agregar-auto');
    this.modalCtrl.dismiss();
  }
}
