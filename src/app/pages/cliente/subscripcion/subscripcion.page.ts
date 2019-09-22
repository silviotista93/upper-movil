import { Component, OnInit } from '@angular/core';

import { Usuario, Car, Suscripciones, CarSuscription2, Plan } from '../../../interfaces/interfaces';
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
  public suscripciones: Suscripciones[] = [];
  public carSuscription: CarSuscription2;
  public plan: Plan[] = [];
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
    this.loadSusCriptions();
  }

  async loadSusCriptions() {
    const loading = await this.loadCtrl.create({
      spinner: 'crescent'
    })
    loading.present();
    this.serviSuscrip.getSuscriptionsClient().then((data: any) => {
      this.suscripciones = data;
      console.log('listado', this.suscripciones);
      this.suscripciones.reverse();
      
      this.suscripciones.forEach(element => {
        this.id++;
        // this.id = element['suscriptions']['plans']['id'];
        const id = element['suscriptions']['plans']['id'];
        if (id) {

          this.plan.push(element['suscriptions']['plans']);
          // if (this.plan[this.id]['id']) {

          // }
        }
        console.log('element', this.id);
        
      });
      console.log('element', this.plan);
      loading.dismiss();
    });
  }

  abrirListSubscripciones() {
    this.navCtrl.navigateForward('/menu/list-subscripciones');

  }

  goDetail(carSuscription) {
    console.log('hola bebe', carSuscription);
    this.router.navigate(['/menu/detail-suscription', { name: 'name' }]);
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
