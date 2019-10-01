import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { OrderService } from '../../../service/cliente/order.service';
import { Order } from 'src/app/interfaces/interfaces';
import { Router } from '@angular/router';
// import { Order } from '../../../interfaces/order_interface';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  public order: Order[] = [];

  idDetalle = 1;
  constructor(
    private navCtrl: NavController,
    private loadCtrl: LoadingController,
    private router: Router,
    private orderService: OrderService) { }

  ngOnInit() {
    // this.loadData();
    // console.log(this.order);
  }

  async ionViewWillEnter() {
    await this.loadData();
    // console.log('historial page', this.order);
  }

  pushDetalleLavado(order) {
    console.log('hola bebe en order', order);
    this.router.navigate(['/menu/detalle-lavado', { name: JSON.stringify(order) }]);
    // this.navCtrl.navigateForward(`/menu/detalle-lavado/${id}`);
  }

  async loadData() {
    this.order = [];
    const loading = await this.loadCtrl.create({
      spinner: 'crescent'
    });
    loading.present();
    
    this.orderService.getOrden().then((resp: any) => {
      this.order = resp;
      this.order.reverse();
      console.log(' datos de array', this.order);
      loading.dismiss();
    });
    loading.dismiss();
  }

}
