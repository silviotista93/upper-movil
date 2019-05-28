import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { Car, Type_Wash, Order } from '../../../interfaces/interfaces';
import { OrderService } from '../../../service/cliente/order.service';

@Component({
  selector: 'app-modal-confirmar-solicitud',
  templateUrl: './modal-confirmar-solicitud.page.html',
  styleUrls: ['./modal-confirmar-solicitud.page.scss'],
})
export class ModalConfirmarSolicitudPage implements OnInit {

  @Input() nombre;
  sliderConfig = {
    spaceBetween: 20,
    centeredSlides: false,
    slidesPerView: 1.2
  };
  public dataPlanCar: Car[] = [];
  // public typeWash: Type_Wash[] = [];
  typeWash: Type_Wash = {seleccionado: false};

  public dataTypeWash: Type_Wash[] = [];
  order: Order = {};

  constructor( private modalCtrl: ModalController,
    private orderService: OrderService,
    private loadCtrl: LoadingController,
    ) { }

  ngOnInit() {
    this.dataPlanCar = this.nombre;
    console.log(this.dataPlanCar);
    this.typeWash = this.dataPlanCar[0].subscription[0].plans.wash_type;
    console.log('tipos lavados', this.typeWash);
  }

  cerrar_modal() {
    this.modalCtrl.dismiss();
  }

   async info_type_wash (typeWash: Type_Wash ) {
  //  await this.desmarcarSeleccionado(typeWash);

     if ( typeWash.seleccionado ) {
      typeWash.seleccionado = false;

      const id2 = typeWash.id;
      const pos = this.dataTypeWash.findIndex(i => i.id === id2);
      console.log('id', pos);

      this.dataTypeWash = this.dataTypeWash.slice(0, pos)
      .concat(this.dataTypeWash.slice(pos + 1, this.dataTypeWash.length));

      console.log('desclikeado', this.dataTypeWash);
      return;
    }

      typeWash.seleccionado = true;
      this.dataTypeWash.push(typeWash);

      console.log('clikeado', this.dataTypeWash);

  }

  //  private async desmarcarSeleccionado (washSelecc: Type_Wash) {

  //    for ( const typeWash of this.typeWash) {
  //        if ( typeWash.type !== washSelecc.type) {
  //          typeWash.seleccionado = false;
  //          this.dataTypeWash.pop();
  //        }
  //    }
  //  }

  async registrarOrden(order: Order) {
    const loading = await this.loadCtrl.create({
      spinner: 'crescent'
    });
    loading.present();


    const validated = await this.orderService.createOrder(this.order);
    console.log(this.order);
    if (validated) {
      loading.dismiss();
    } else {
      loading.dismiss();
    }
  }
}
