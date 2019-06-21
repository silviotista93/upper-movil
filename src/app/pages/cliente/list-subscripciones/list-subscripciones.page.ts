import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ModalController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Plan } from '../../../interfaces/interfaces';
import { environment } from '../../../../environments/environment';
import { SuscripcionService } from '../../../service/cliente/suscripcion.service';
import { ModalInfoPlanPage } from '../modal-info-plan/modal-info-plan.page';

@Component({
  selector: 'app-list-subscripciones',
  templateUrl: './list-subscripciones.page.html',
  styleUrls: ['./list-subscripciones.page.scss'],
})
export class ListSubscripcionesPage implements OnInit {

  URL = environment.url;
  public plans: Plan[] = [];
  // public plansDataSelec: Plan[] = [];
  // public planData: Plan = {}

  sliderConfig = {
    spaceBetween: 20,
    centeredSlides: false,
    slidesPerView: 1.2
  };

  constructor(
    private navCtrl: NavController,
    private statusBar: StatusBar,
    private loadCtrl: LoadingController,
    private plansService: SuscripcionService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
     this.statusBar.hide();
     this.loadData();
    
  }

  // async ionViewWillEnter(){
  //    this.statusBar.hide();
  //    this.loadData();
  //   this.plansDataSelec.length = 0;
  //   console.log('viewWillEnter');
  // } 

  atras() {
    this.navCtrl.back();
    this.statusBar.show();
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

  abriPaymet() {
    this.navCtrl.navigateForward('/menu/paymet');
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
}
