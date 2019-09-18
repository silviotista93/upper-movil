import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController, LoadingController, IonSlide, IonSlides } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { environment } from '../../../../environments/environment';
import { Plan, CreateSuscription, Car, Washtype } from '../../../interfaces/interfaces';
import { SuscripcionService } from '../../../service/cliente/suscripcion.service';
import { ModalInfoPlanPage } from '../modal-info-plan/modal-info-plan.page';
import { CarService } from '../../../service/cliente/car.service';
import { UiServiceService } from '../../../service/ui-service.service';
import { async } from '@angular/core/testing';
import { ModalAlertPlanAutoPage } from '../modal-alert-plan-auto/modal-alert-plan-auto.page';
import { SubscripcionPage } from '../subscripcion/subscripcion.page';

@Component({
  selector: 'app-modal-payment',
  templateUrl: './modal-payment.page.html',
  styleUrls: ['./modal-payment.page.scss'],
})
export class ModalPaymentPage implements OnInit {

  @ViewChild('sliderPrincipal') slide: IonSlides

  sliderConfig = {
    spaceBetween: 20,
    centeredSlides: false,
    slidesPerView: 1.2
  };

  URL = environment.url;
  public plans: Plan[] = [];
  public planSelected: Plan = {
    name: '',
    description: ''
  };

  public cars: Car[] = [];
  public firstCars: Car = {};
  public arrayTypeWash: Washtype[] = [];

  createPlan: CreateSuscription = {};
  plan_id: any;
  car_id: any;

  constructor(
    public modalCtrl: ModalController,
    public modalCtrlAlert: ModalController,
    public statusBar: StatusBar,
    private navCtrl: NavController,
    public carService: CarService,
    private loadCtrl: LoadingController,
    private plansService: SuscripcionService,
    private uiService: UiServiceService
  ) { }

  ngOnInit() {
    this.statusBar.hide();
    this.loadData();
    this.loadDataCars();
    this.slide.lockSwipes(true);
  }

  async loadData() {

    const loading = await this.loadCtrl.create({
      spinner: 'crescent'
    });

    loading.present();

    this.plansService.getPlans().subscribe(resp => {
      this.plans.push(...resp['plans']);
      loading.dismiss();
      // event.target.complete();
      console.log('Planes', this.plans);
    });
  }
  async loadDataCars() {

    const loading = await this.loadCtrl.create({
      spinner: 'crescent'
    });

    loading.present();

    this.carService.getCarsPayment().subscribe(resp => {
      this.cars.push(...resp['cars']);
      loading.dismiss();
      // event.target.complete();
      console.log('Cars', this.cars);
    });
  }

  cerrar_modal() {
    this.modalCtrl.dismiss();
    this.statusBar.show();
  }

  //#region IR AL DETALLE DEL PLAN
  async abrirModalDetallePlan(plan: Plan) {
    // this.plansDataSelec.push(plan);
    const modal = await this.modalCtrl.create({

      component: ModalInfoPlanPage,
      cssClass: 'info-plan-modal',
      componentProps: {
        nombre: plan.id
      }
    });
    await modal.present();
  };
  //#endregion

  //#region MOSTRAR AUTOS
  async mostrarAutos(plan: Plan) {
    this.slide.lockSwipes(false);
    if (this.cars.length > 0) {
      this.slide.slideTo(1);
      this.plan_id = plan.id;
      this.slide.lockSwipes(true);
    } else {
      this.cerrar_modal();
      const modal = await this.modalCtrlAlert.create({
        component: ModalAlertPlanAutoPage,
        cssClass: 'modal-alert-css',
        componentProps: {
          nombre: ''
        },
        backdropDismiss: false
      });
      await modal.present();
    }
  }
  //#endregion


  //#region 
  async mostrarMetodosPago(car: Car) {
    console.log('estamos en metodos de pago');
    const loading = await this.loadCtrl.create({
      spinner: 'crescent'
    });

    loading.present();

    this.slide.lockSwipes(false);
    this.slide.slideTo(2);
    this.car_id = car.id;
    this.createPlan = {
      plan_id: this.plan_id,
      car_id: this.car_id,
      type_wash_id: 0,
      quantity: 2
    }
    
    
    this.carService.firstCar(this.car_id).then((data: any) => {
      this.firstCars = data['car'];
      console.log('auto seleccionado', this.firstCars);
    });

    this.plansService.firstPlan(this.plan_id).then((data: any) => {

      loading.present();

      this.planSelected = data['plan'];
      this.arrayTypeWash = data['plan']['wash_type'];
      console.log('plan seleccionado name', this.planSelected);
      console.log('plan seleccionado tipo wash', this.arrayTypeWash);
      loading.dismiss();
    })

    this.slide.lockSwipes(true);
  }

  async agregarSuscripcion() {

    const loading = await this.loadCtrl.create({
      spinner: 'crescent'
    });
    loading.present();
    this.createPlan = {
      plan_id: this.plan_id,
      car_id: this.car_id
    }
    console.log('datos creados', this.createPlan);
    const validated = await this.plansService.registroSuscripcion(this.createPlan);

    if (validated) {
      loading.dismiss();
      this.uiService.successToast('Suscripcion creada exitosamente');
      this.cerrar_modal();
    } else {
      loading.dismiss();
      this.cerrar_modal();
      this.uiService.errorToast('Error, verifica tus datos');
    }

  }
}
