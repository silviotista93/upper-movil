import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { Washtype, Plan, CarDetailSuscription } from 'src/app/interfaces/interfaces';
import { SuscripcionService } from 'src/app/service/cliente/suscripcion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CarSuscription } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-detail-suscription',
  templateUrl: './detail-suscription.page.html',
  styleUrls: ['./detail-suscription.page.scss'],
})
export class DetailSuscriptionPage implements OnInit {


  public plan: Plan = {};

  public arrayDetail: [] = []
  public carDetailSus: CarDetailSuscription[] = [];
  public carSuscription: CarSuscription[] = [];
  public washType: Washtype[] = [];
  // plans: Plan[];

  constructor(
    private navCtrl: NavController,
    private loadCtrl: LoadingController,
    private route: ActivatedRoute,
    private suscripcionService: SuscripcionService) { }

  ngOnInit() {
  }


  ionViewWillEnter() {
    const name = this.route.snapshot.paramMap.get("name")
    this.arrayDetail = JSON.parse(name);
    console.log('Lo que recibes', this.arrayDetail);
    // this.loadData();
    this.load();
  }

  // async loadData() {
  //   const loading = await this.loadCtrl.create({
  //     spinner: 'crescent'
  //   });
  //   // loading.present();


  //   if (this.arrayDetail) {
  //     this.arrayDetail.forEach((carDetail: CarDetailSuscription[]) => {
  //       this.carDetailSus = carDetail;
  //       console.log('no se que es', this.carDetailSus);

  //       this.carDetailSus.forEach(element => {


  //         console.log(' elemento', element);
  //         console.log(' tipos de lavado', element['wash_type']['type']);
  //         // this.washType.push(element['wash_type']);
  //       });
  //     });

  //     // console.log(' tipos de lavado', this.washType);
  //   }

  // }

  async load() {

    this.carDetailSus = this.arrayDetail['car_detail'];
    this.plan = this.arrayDetail['plans'];
    this.carDetailSus.forEach(element => {
      this.washType.push(element['wash_type']);
      // console.log('tipo lavado', this.washType);
    });
    console.log('Detail suscripcion', this.carDetailSus);
    // console.log('Plan ', this.plan);
    

  }
}
