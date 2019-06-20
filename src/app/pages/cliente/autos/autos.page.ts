import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NavController, LoadingController, IonSlides, ActionSheetController, AlertController } from '@ionic/angular';
import { CarService } from '../../../service/cliente/car.service';
import { Car, Usuario } from '../../../interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { UserService } from '../../../service/cliente/user.service';
import { UiServiceService } from '../../../service/ui-service.service';


@Component({
  selector: 'app-autos',
  templateUrl: './autos.page.html',
  styleUrls: ['./autos.page.scss'],
})

export class AutosPage implements OnInit {


  cars: Car[] = [];

  URL = environment.url;
  evento: Event;

  idCar: any;

  constructor(
    private navCtrl: NavController,
    private carService: CarService,
    private loadCtrl: LoadingController,
    private actionSheetController: ActionSheetController,
    private alertCtrl: AlertController,
    private uiService: UiServiceService,
    private userService: UserService) { }

  public user: Usuario = {};

  ngOnInit() {
    // this.doRefresh(this.evento);
    // this.loadData();
    // this.user = this.userService.getUsuario();
    // console.log('usuario ', this.user);
  }

  async ionViewWillEnter() {
    this.cars = [];
    await this.loadData();
    this.user = await this.userService.getUsuario();
    console.log('auto ', this.cars);
  }

  pushAgregarAuto() {
    this.navCtrl.navigateForward('/menu/agregar-auto');
  }

  // #region Cargar Datos
  async loadData() {

    const loading = await this.loadCtrl.create({
      spinner: 'crescent'
    });

    loading.present();

    this.carService.getCars().subscribe(resp => {
      this.cars.push(...resp['cars']);
      this.cars.reverse();
      loading.dismiss();
      // event.target.complete();
      console.log('Los carros ', this.cars);
    });
  }
  // #endregion

  async lanzarMenu(event) {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Editar',
        icon: 'create',
        handler: () => {
          console.log('Editar clicked');
          console.log(event.srcElement.id)
        }
      }, {
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
          const id = event.srcElement.id.toString();
          console.log('carrrr iiiiid', id);
          const message = "¿Desea eliminar el carro?"
          this.presentConfirm(message, id);
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  // #region Alerta confirmacion de eliminar
  async  presentConfirm(message: string, id: string) {
    const alert2 = await this.alertCtrl.create({
      message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('aceptar');
            this.carService.deleteCar(id);
            this.ionViewWillEnter();
          }
        }
      ]
    });
    await alert2.present();
  }
  //#endregion
}
