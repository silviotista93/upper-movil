import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { OrderService } from '../../../service/cliente/order.service';
import { Order } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  public order: Order[] = [];
  public listOrder: Order[] = [];
  idDetalle = 1;
  constructor(
    private navCtrl: NavController,
    private loadCtrl: LoadingController,
    private orderService: OrderService) { }

  ngOnInit() {
    this.loadData();
    console.log(this.order);
  }
  pushDetalleLavado(id) {
    this.navCtrl.navigateForward(`/menu/detalle-lavado/${id}`);
  }

  async loadData() {

    const loading = await this.loadCtrl.create({
      spinner: 'crescent'
    });

    loading.present();
    this.orderService.getOrden().subscribe(resp => {
      this.order.push(...resp['orders']);
      this.order.reverse();
      loading.dismiss();
    });
  }
}
