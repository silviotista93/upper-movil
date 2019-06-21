import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { SuscripcionService } from '../../../service/cliente/suscripcion.service';
import { Plan } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-modal-info-plan',
  templateUrl: './modal-info-plan.page.html',
  styleUrls: ['./modal-info-plan.page.scss'],
})
export class ModalInfoPlanPage implements OnInit {
  @Input() nombre;
  public plans: Plan = null;
  constructor(
    public modalCtrl: ModalController,
    public loadCtrl: LoadingController,
    public planService: SuscripcionService,
    ) { }

  ngOnInit() {
    // this.loadData();
    this.planService.firstPlans2(this.nombre).then((plans: any) => {
      this.plans = plans;
      console.log('vista', this.plans);
    }).catch();

  }

  // async loadData() {

  //   const loading = await this.loadCtrl.create({
  //     spinner: 'crescent'
  //   });

  //   loading.present();
  //   console.log('id', this.nombre);
  //   this.planService.firstPlans(1).subscribe(resp => {
  //     this.plans.push(...resp['plan']);
  //     loading.dismiss();
  //     // event.target.complete();
  //     console.log('Planes', this.plans);
  //   });
  // }

  cerrar_modal() { 
    this.modalCtrl.dismiss();
  }
}
