import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController, NavController } from '@ionic/angular';
import { Car, Type_Wash, Order, Usuario, CarDetailSuscription, Plan, CarSuscription } from '../../../interfaces/interfaces';
import { OrderService } from '../../../service/cliente/order.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UiServiceService } from '../../../service/ui-service.service';
import { UserService } from '../../../service/cliente/user.service';
import { environment } from '../../../../environments/environment';

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
  public carDetail: CarDetailSuscription[] = []
  public carSuscription: CarSuscription;
  public carDetailSuscription: CarDetailSuscription = {};
  public plan: Plan = {}

  // public typeWash: Type_Wash[] = [];
  typeWash: Type_Wash = { seleccionado: false };

  public dataTypeWash: Type_Wash[] = [];
  public dataCarDetail: CarDetailSuscription[] = [];
  idArray: any[] = [];
  usuario: Usuario = {};
  order: Order = {};

  constructor(private modalCtrl: ModalController,
    private orderService: OrderService,
    private loadCtrl: LoadingController,
    // private geolocation: Geolocation,
    private navCtrl: NavController,
    private uiService: UiServiceService,
    private userService: UserService) { }

  async ngOnInit() {
    this.dataPlanCar = this.nombre;
    this.carSuscription = this.dataPlanCar[0].car_suscription[0];
    this.carDetail = this.dataPlanCar[0].car_suscription[0]['car_detail'];
    this.plan = this.dataPlanCar[0].car_suscription[0]['plans'];
    this.usuario = await this.userService.getUsuario();
    console.log('DATA PLAN CAR', this.dataPlanCar);
    console.log('Suscripcion car', this.carSuscription);
    console.log('CAR DETAIL', this.carDetail);
    console.log('CAR PLAN', this.plan);
    console.log('holA BEBE ', environment.address, environment.lat, environment.lng);
  }

  cerrar_modal() {
    this.modalCtrl.dismiss();
  }

  async info_type_wash(typeWash: Type_Wash) {
    console.log('clic ', typeWash);
    this.carDetailSuscription = typeWash['pivot'];
    console.log('clic 3', typeWash['pivot']);

    if (typeWash.seleccionado) {
      typeWash.seleccionado = false;

      const id2 = this.carDetailSuscription.id;
      const pos = this.dataCarDetail.findIndex(i => i.id === id2);
      console.log('pos', pos);

      this.dataCarDetail = this.dataCarDetail.slice(0, pos)
        .concat(this.dataCarDetail.slice(pos + 1, this.dataCarDetail.length));

      this.idArray = this.idArray.slice(0, pos)
        .concat(this.idArray.slice(pos + 1, this.idArray.length));
      console.log('desclikeado', this.dataCarDetail);
      console.log('idArreglo', this.idArray);

      return;
    }

    typeWash.seleccionado = true;
    this.dataCarDetail.push(this.carDetailSuscription);
    this.idArray.push(this.carDetailSuscription.id);
    console.log('clikeado', this.dataCarDetail);
    console.log('idArreglo', this.idArray);

  }

  async registrarOrden() {

    const loading = await this.loadCtrl.create({
      spinner: 'crescent'
    });
    loading.present();

    console.log('ARRAY', this.idArray.length)
    if (this.idArray.length === 0) {
      this.uiService.errorToast('Debes seleccionar un tipo de lavado');
      loading.dismiss();
    } else {

      this.idArray.forEach(element => {
        this.order = {
          latitude: environment.lat,
          longitude: environment.lng,
          address: environment.address,
          user_id: this.usuario.id,
          car_detail_subscription_id: element
        };
        console.log(this.order);

        const validated = this.orderService.createOrder(this.order);
        if (validated) {
          //   NAVEGA A LA PAGINA PRINCIPAL
          loading.dismiss();
          this.cerrar_modal();
          this.navCtrl.navigateForward('/menu/historial');
          this.uiService.successToast('Tu solicitud ha sido creada');
        } else {
          //  MUESTRA ALERTA DE ERROR EN INICIO DE SESION
          loading.dismiss();
          this.cerrar_modal();
          this.navCtrl.navigateForward('/menu/home');
          this.uiService.errorToast('No se pudo completar tu solicitud');
        }
      });
    }

  }
}
