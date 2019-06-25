import { Component, OnInit } from '@angular/core';

import { Usuario, Car, Suscription, Suscripciones } from '../../../interfaces/interfaces';
import { UserService } from '../../../service/cliente/user.service';
import { NavController, ModalController } from '@ionic/angular';
import { SuscripcionService } from '../../../service/cliente/suscripcion.service';
import { ModalPaymentPage } from '../modal-payment/modal-payment.page';

@Component({
  selector: 'app-subscripcion',
  templateUrl: './subscripcion.page.html',
  styleUrls: ['./subscripcion.page.scss'],
})
export class SubscripcionPage implements OnInit {

  usuario: Usuario = {};
  public car: Car[] = [];
  public suscripciones: Suscripciones[] = [];
  constructor(
    private userService: UserService,
    private navCtrl: NavController,
    private serviSuscrip: SuscripcionService,
    public modalCtrl: ModalController,
    ) { }

  async ngOnInit() {
     this.usuario = await this.userService.getUsuario();
     this.serviSuscrip.getSuscriptionsClient().then((data: any) => {
      this.suscripciones = data;
      console.log('listado', this.suscripciones);
    });
  }

  abrirListSubscripciones() {
    this.navCtrl.navigateForward('/menu/list-subscripciones');
  }

 
  async abrirModalPayment () {
    // this.plansDataSelec.push(plan);
      const modal = await this.modalCtrl.create({
        component: ModalPaymentPage,
        cssClass: 'payment-plan-modal',
        componentProps: {
        data: ''
      }
      });
      await modal.present();
  };
}
