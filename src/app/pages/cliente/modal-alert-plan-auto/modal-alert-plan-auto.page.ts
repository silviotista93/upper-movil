import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-alert-plan-auto',
  templateUrl: './modal-alert-plan-auto.page.html',
  styleUrls: ['./modal-alert-plan-auto.page.scss'],
})
export class ModalAlertPlanAutoPage implements OnInit {

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }
  abrirAgregarAuto() {
    this.navCtrl.navigateForward('/menu/agregar-auto');
    this.modalCtrl.dismiss();
  }
}
