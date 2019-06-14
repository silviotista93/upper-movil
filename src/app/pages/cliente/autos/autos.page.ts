import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NavController, LoadingController, IonSlides, ActionSheetController } from '@ionic/angular';
import { CarService } from '../../../service/cliente/car.service';
import { Car, Usuario } from '../../../interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { UserService } from '../../../service/cliente/user.service';


@Component({
  selector: 'app-autos',
  templateUrl: './autos.page.html',
  styleUrls: ['./autos.page.scss'],
})

export class AutosPage implements OnInit {


  cars: Car[] = [];

  URL = environment.url;
  evento: Event;

  constructor(
    private navCtrl: NavController,
    private carService: CarService,
    private loadCtrl: LoadingController,
    private actionSheetController: ActionSheetController,
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
    this.user = this.userService.getUsuario();
    console.log('auto ', this.cars);

  }

  pushAgregarAuto() {
    this.navCtrl.navigateForward('/menu/agregar-auto');
  }

  // async doRefresh(event?) {

  //   await this.loadData(event);
  //   console.log('refresh')

  // }
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
  async lanzarMenu() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      buttons: [{
        text: 'Editar',
        icon: 'create',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
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
}
