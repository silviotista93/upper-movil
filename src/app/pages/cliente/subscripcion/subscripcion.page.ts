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
  // public suscripciones: Suscripciones[] = [];
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

  async ngOnInit() {
    // this.usuario = await this.userService.getUsuario();
    // const loading = await this.loadCtrl.create({
    //   spinner: 'crescent'
    // })
    // loading.present();
    // this.serviSuscrip.getSuscriptionsClient().then((data: any) => {
    //   this.suscripciones = data;
    //   console.log('listado', this.suscripciones);
    //   loading.dismiss();
    // });
  }

  async ionViewWillEnter() {
    this.usuario = await this.userService.getUsuario();
    // this.carSuscriptions = await this.serviSuscrip.getSuscriptions();
    // this.carSuscriptions.push(await this.serviSuscrip.getSuscriptionsClient());
    // this.carSuscriptions.push(...this.serviSuscrip.getSuscriptions());
    // console.log('ionview jeje', this.carSuscriptions);
    this.loadSusCriptions();
  }

  async loadSusCriptions() {
    this.carSuscriptions = []
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
        // this.id = element['plans']['name'];
        this.plans.push(element['plans']);
        this.carDetailSus.push(element['car_detail']);
        // const id = element['suscripciones']['plans']['id'];
        // if (this.id) {
        //   this.plan.push(element['plans']);
        //   // if (this.plan[this.id]['id']) {
        //   // }
        // }
      });
      // console.log('element', this.plans);
      console.log('element', this.carDetailSus);
      loading.dismiss();
    });
  }

  abrirListSubscripciones() {
    this.navCtrl.navigateForward('/menu/list-subscripciones');

  }

  goDetail(carSuscription) {
    console.log('hola bebe', carSuscription);
    this.router.navigate(['/menu/detail-suscription', { name: JSON.stringify(this.carDetailSus) }]);
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
