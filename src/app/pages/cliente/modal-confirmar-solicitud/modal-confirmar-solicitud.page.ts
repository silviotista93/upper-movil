import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController, NavController } from '@ionic/angular';
import { Car, Type_Wash, Order, Usuario } from '../../../interfaces/interfaces';
import { OrderService } from '../../../service/cliente/order.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UiServiceService } from '../../../service/ui-service.service';
import { UserService } from '../../../service/cliente/user.service';

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
  id: any = [];
  idUser: any = [];
  usuario: Usuario = {};
  order: Order = {};

  constructor( private modalCtrl: ModalController,
    private orderService: OrderService,
    private loadCtrl: LoadingController,
    private geolocation: Geolocation,
    private navCtrl: NavController,
    private uiService: UiServiceService,
    private userService: UserService
    ) { }

  async ngOnInit() {
    this.dataPlanCar = this.nombre;
    console.log(this.dataPlanCar);
    this.typeWash = this.dataPlanCar[0].subscription[0].plans.wash_type;
    this.usuario = await this.userService.getUsuario();
    this.idUser = this.usuario.id;
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

      this.id = this.id.slice(0, pos)
      .concat(this.id.slice(pos + 1, this.id.length));
      console.log('desclikeado', this.id);
      console.log('idArreglo', this.id);

      return;
    }

      typeWash.seleccionado = true;
      this.dataTypeWash.push(typeWash);
      this.id.push(typeWash.id);
      console.log('clikeado', this.dataTypeWash);
      console.log('idArreglo', this.id);

  }

  //  private async desmarcarSeleccionado (washSelecc: Type_Wash) {

  //    for ( const typeWash of this.typeWash) {
  //        if ( typeWash.type !== washSelecc.type) {
  //          typeWash.seleccionado = false;
  //          this.dataTypeWash.pop();
  //        }
  //    }
  //  }

  async registrarOrden() {
    const loading = await this.loadCtrl.create({
      spinner: 'crescent'
    });
     loading.present();
    this.geolocation.getCurrentPosition().then((resp) => {
      const myLatLng = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      };
      this.order = {
        latitude: myLatLng.lat,
        longitude: myLatLng.lng,
        subscription: this.dataPlanCar[0].subscription[0].id,
        address: 'Rincon de Yambitara 2 Etapa',
        typesWash: this.id,
        user_id: this.idUser,
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
            }
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    const rta = this.geolocation.getCurrentPosition();
  }
}
