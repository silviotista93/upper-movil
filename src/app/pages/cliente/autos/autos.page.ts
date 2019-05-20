import { Component, OnInit, Input } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
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

  constructor(
    private navCtrl: NavController,
    private carService: CarService,
    private loadCtrl: LoadingController,
    private userService: UserService) { }

  public user: Usuario = {};

  ngOnInit() {

    this.loadData();

    this.user = this.userService.getUsuario();
    console.log('usuario ', this.user);

    // this.carService.newCar.subscribe(car => {
    //   this.cars.unshift(car);
    // });

    // this.carService.newPost.subscribe(car => {
    //   this.cars.unshift(car);
    //   this.cars.reverse();
    // });
  }

  pushAgregarAuto() {
    this.navCtrl.navigateForward('/agregar-auto');
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
      console.log('Los carros ', this.cars);
    });
  }
  // #endregion
}
