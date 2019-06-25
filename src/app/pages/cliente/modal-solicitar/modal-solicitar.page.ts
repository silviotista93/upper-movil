import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Car } from 'src/app/interfaces/interfaces';
import { environment } from '../../../../environments/environment.prod';
import { ModalConfirmarSolicitudPage } from '../modal-confirmar-solicitud/modal-confirmar-solicitud.page';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UiServiceService } from 'src/app/service/ui-service.service';

@Component({
  selector: 'app-modal-solicitar',
  templateUrl: './modal-solicitar.page.html',
  styleUrls: ['./modal-solicitar.page.scss'],
})
export class ModalSolicitarPage implements OnInit {

  @Input() nombre;

  sliderConfig = {
    spaceBetween: 20,
    centeredSlides: false,
    slidesPerView: 1.2
  };
  public carsSeleccData: Car[] = [];
  public cars_2: Car[] = [];
  public carsDataPlan: Car[] = [];

  carSeleccData: any;
  URL = environment.url;
  constructor(
    private  modalCtrl: ModalController,
    public statusBar: StatusBar,
    public navCtrl: NavController,
    public uiService: UiServiceService
    ) { }

  ngOnInit() {
    this.cars_2 = this.nombre;
    console.log('estos son tus coches', this.cars_2);
    this.statusBar.hide();
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.navCtrl.pop();
  }
  cerrar_modal() {
    this.statusBar.show();
    this.modalCtrl.dismiss();
  }
  pushConfirmarServicio() {
    console.log('confirmar servicio');
  }

  info_car (car: Car ) {
    this.desmarcarSeleccionado(car);
    if ( car.seleccionado ) {
      car.seleccionado = false;
      return;
    }
    car.seleccionado = true;
    this.carsDataPlan.push(car);
    this.abrirConfirmarServicio();
    setTimeout(() => {
      car.seleccionado = false;
    }, 500);
  }

  private desmarcarSeleccionado (carSelecc: Car) {

    for ( const car of this.cars_2) {
        if ( car.board !== carSelecc.board) {
          car.seleccionado = false;
          this.carsDataPlan.pop();
        }
    }
  }
  // private dataCarPlan (carData:Car) {
  //    this.carsDataPlan.push(carData);
  // }
  // loadData() {
  //   console.log('cargando datos', this.carsDataPlan);
  //   return this.carsDataPlan;
  //  }

  //  abrirConfirmarServicio() {
  //    console.log('boton confirmar solicitud');
  //   this.navCtrl.navigateForward(`/menu/confirmar-solicitud`);
  //   this.modalCtrl.dismiss();
  //  }

   async abrirConfirmarServicio () {
     if (this.carsDataPlan.length) {
     const modal = await this.modalCtrl.create({
       component: ModalConfirmarSolicitudPage,
       cssClass: 'test-modal',
       componentProps: {
       nombre: this.carsDataPlan
     }
     });
     await modal.present();

   } else {
    this.uiService.errorToast('Por favor selecciona un auto');
   }
  }
}
