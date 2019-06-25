import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { CarService } from '../../../service/cliente/car.service';
import { environment } from 'src/environments/environment';
import { Car, Brand, Color, Car_type, Cilindraje } from 'src/app/interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-editar-auto',
  templateUrl: './editar-auto.page.html',
  styleUrls: ['./editar-auto.page.scss'],
})
export class EditarAutoPage implements OnInit {

  //#region Slides per view
  slidesCar = {
    slidesPerView: 3.5,
    spaceBetween: 2
  };

  slidesColor = {
    slidesPerView: 6.0
  };
  //#endregion


  URL = environment.url;

  brands: Brand[] = [];
  colors: Color[] = [];
  carTypes: Car_type[] = [];
  cilindrajes: Cilindraje[] = [];
  car: Car = {}

  // #region Variables string
  avatarSel = new EventEmitter<string>();
  carSel: string;
  cilindrajeSel: string;
  colorSel: string;
  cilindrajeId: string;
  brandSel: string;

  public colorId: string;
  public carId: string;
  public brandId: string;
  image: string = "../assets/banner_add_auto.png";
  //#endregion


  id: any = this.route.snapshot.paramMap.get('id');

  constructor(
    private carService: CarService,
    private loadCtrl: LoadingController,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    await this.loadData();
    await this.loadDataCar();
  }

  // #region Cargar Datos
  async loadData() {
    this.carService.getCar(this.id).subscribe(resp => {
      this.car = resp['car'];
      this.image = this.car.picture;
    });
  }
  // #endregion

  // #region Cargar Marcas, Colores y Tipos 
  async loadDataCar() {

    const loading = await this.loadCtrl.create({
      spinner: 'crescent'
    });
    loading.present();

    this.carService.getCar(this.id).subscribe(resp => {
      this.car = resp['car']
      loading.dismiss();
    });

    this.carService.getBrand().subscribe(resp => {
      this.brands.push(...resp['brands']);
      loading.dismiss();
      for (const brand of this.brands) {
        if (brand.id === this.car.brand_id) {
          this.brandSel = brand.name;
          console.log('branddddd', this.brandSel);
          break;
        }
      }
    });
    this.carService.getColor().subscribe(resp => {
      this.colors.push(...resp['colors']);
      loading.dismiss();
      // console.log('colors', this.colors);
      for (const color of this.colors) {
        if (color.id === this.car.color_id) {
          this.colorSel = color.picture;
          break;
        }
      }
    });
    this.carService.getCarType().subscribe(resp => {
      this.carTypes.push(...resp['carTypes']);
      loading.dismiss();
      // console.log('types', this.carTypes);
      for (const type of this.carTypes) {
        if (type.id === this.car.car_type_id) {
          this.carSel = type.picture;
          break;
        }
      }
    });
    this.carService.getCilindraje().subscribe(resp => {
      this.cilindrajes.push(...resp['cilindrajes']);
      loading.dismiss();
      // console.log('cilindrajes', this.cilindrajes);
      for (const cilin of this.cilindrajes) {
        if (cilin.id === this.car.cilindraje_id) {
          this.cilindrajeSel = cilin.picture;
          break;
        }
      }
    });
  }
  // #endregion

  // #region Metodos clic
  selectedBrand(brand) {
    this.avatarSel.emit(brand.id);
    this.brandId = brand.id;
    console.log("marca", brand.id);
  }

  selectedCar(carTypes) {
    this.carSel = carTypes.picture;
    this.avatarSel.emit(carTypes.picture);
    this.carId = carTypes.id.toString();
    // console.log(this.carId);
  }

  selectedCilindraje(cilindrajes) {
    this.cilindrajeSel = cilindrajes.picture;
    this.avatarSel.emit(cilindrajes.picture);
    this.cilindrajeId = cilindrajes.id.toString();
    // console.log(this.cilindrajeId);
  }

  selectedColor(colors) {
    this.colorSel = colors.picture;
    this.avatarSel.emit(colors.picture);
    this.colorId = colors.id.toString();
    // console.log(this.colorId);
  }
  // #endregion

  // #region Guardar carro
  async saveCar(car) {

    car.picture = this.carService.image;
    car.car_type_id = this.carId;
    car.color_id = this.colorId;
    car.cilindraje_id = this.cilindrajeId;
    // car.user_id = this.user.id.toString();

    console.log('data', this.car);
    await this.carService.createCar(car);
    this.carService.image = "";

  }
  // #endregion
}
