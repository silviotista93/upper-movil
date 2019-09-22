import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { Washtype, Plan } from 'src/app/interfaces/interfaces';
import { SuscripcionService } from 'src/app/service/cliente/suscripcion.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-suscription',
  templateUrl: './detail-suscription.page.html',
  styleUrls: ['./detail-suscription.page.scss'],
})
export class DetailSuscriptionPage implements OnInit {

  washType: Washtype;
  public plans: Plan = {
    name: ''
  };

  constructor(
    private navCtrl: NavController,
    private loadCtrl: LoadingController,
    private route: ActivatedRoute,
    private suscripcionService: SuscripcionService) { }

  ngOnInit() {
  }


  ionViewWillEnter() {
    const name = this.route.snapshot.paramMap.get("name")
    console.log('nombre recibe', name)
  // this.loadData();
  }

  async loadData() {
    const loading = await this.loadCtrl.create({
      spinner: 'crescent'
    });
    loading.present();

    // this.suscripcionService.firstPlans2().then((plans: any) => {
    //   this.plans = plans;
    //   this.washType = plans['wash_type']
    //   console.log('vista', this.plans);
    //   console.log('vista', this.washType);
    //   loading.dismiss();
    // }).catch(e => {
    //   loading.dismiss();
    // });

  }
}
