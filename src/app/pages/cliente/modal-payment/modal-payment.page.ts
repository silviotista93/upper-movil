import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController, LoadingController, IonSlide, IonSlides } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { environment } from '../../../../environments/environment';
import { Plan, CreateSuscription, Car } from '../../../interfaces/interfaces';
import { SuscripcionService } from '../../../service/cliente/suscripcion.service';
import { ModalInfoPlanPage } from '../modal-info-plan/modal-info-plan.page';
import { CarService } from '../../../service/cliente/car.service';
import { UiServiceService } from '../../../service/ui-service.service';

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
  public firstPlan: Plan = null;
  public cars: Car[] = [];
  public firstCars: Car = {};
  createPlan: CreateSuscription = null;
  plan_id: any;
  car_id: any;
  constructor(
    public modalCtrl: ModalController,
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

    this.carService.getCars().subscribe(resp => {
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

  async abrirModalDetallePlan (plan: Plan) {
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

  mostrarAutos(plan: Plan) {
    this.slide.lockSwipes(false);
    this.slide.slideTo(1);
    this.plan_id = plan.id;
    this.slide.lockSwipes(true);
  }

  async mostrarMetodosPago(car: Car) {
    this.slide.lockSwipes(false);
    this.slide.slideTo(2);
    this.car_id = car.id;
    this.createPlan = {
      plan_id: this.plan_id,
      car_id: this.car_id
    }
    const loading = await this.loadCtrl.create({
      spinner: 'crescent'
    });

    loading.present();
    this.carService.firstCar(this.car_id).then((data: any) => {
      this.firstCars = data;
      console.log('auto seleccionado', this.firstCars);
    });
    this.plansService.firstPlan(this.plan_id).then((data: any) =>{
      this.firstPlan = data;
      console.log('plan seleccionado', this.firstPlan);
    })
    loading.dismiss();
    
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
      console.log(this.createPlan);
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
