import { Component, OnInit } from '@angular/core';

import { Usuario, Car, Suscripciones, Plan, CarDetailSuscription, CarSuscription } from '../../../interfaces/interfaces';
import { UserService } from '../../../service/cliente/user.service';
import { NavController, ModalController, LoadingController } from '@ionic/angular';
import { SuscripcionService } from '../../../service/cliente/suscripcion.service';
import { ModalPaymentPage } from '../modal-payment/modal-payment.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscripcion',
  templateUrl: './subscripcion.page.html',
  styleUrls: ['./subscripcion.page.scss'],
})
export class SubscripcionPage implements OnInit {

  usuario: Usuario = {};
  public car: Car[] = [];
  public carSuscriptions: CarSuscription[] = [];
  public carDetailSus: CarDetailSuscription[] = [];
  public plans: Plan[] = [];
  id: any;

  constructor(
    private userService: UserService,
    private navCtrl: NavController,
    private serviSuscrip: SuscripcionService,
    public modalCtrl: ModalController,
    private router: Router,
    public loadCtrl: LoadingController
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.carSuscriptions = [];
    this.usuario = await this.userService.getUsuario();
    await this.loadSusCriptions();
  }

  async loadSusCriptions() {
    this.carSuscriptions = [];
    const loading = await this.loadCtrl.create({
      spinner: 'crescent'
    })
    loading.present();
    this.serviSuscrip.getSuscriptionsClient().then((data: any) => {
      this.carSuscriptions = data;
      console.log('listado', this.carSuscriptions);
      this.carSuscriptions.reverse();
      this.carSuscriptions.forEach(element => {
        this.id++;
        this.plans.push(element['plans']);
      });
      loading.dismiss();
    });
  }

  abrirListSubscripciones() {
    this.navCtrl.navigateForward('/menu/list-subscripciones');

  }

  goDetail(carSuscription) {
    console.log('hola bebe', carSuscription);
    this.router.navigate(['/menu/detail-suscription', { name: JSON.stringify(carSuscription) }]);
    this.carSuscriptions = [];
    
  }

  //#region ABRIR MODAL PARA PAGO
  async abrirModalPayment() {
    // this.plansDataSelec.push(plan);
    const modal = await this.modalCtrl.create({
      component: ModalPaymentPage,
      cssClass: 'payment-plan-modal',
      componentProps: {
        data: ''
      }
    });
    await modal.present();

    await modal.onDidDismiss().then(() => {
      this.ionViewWillEnter();
    });

  };
  //#endregion
}
