import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Brand, Color, Car_type, Usuario, Car } from 'src/app/interfaces/interfaces';
import { CarService } from 'src/app/service/cliente/car.service';
import { UserService } from 'src/app/service/cliente/user.service';
import { environment } from 'src/environments/environment';
import { LoadingController, NavController } from '@ionic/angular';
import { Cilindraje } from '../../../interfaces/interfaces';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


declare var window: any;


@Component({
  selector: 'app-agregar-auto',
  templateUrl: './agregar-auto.page.html',
  styleUrls: ['./agregar-auto.page.scss'],
})
export class AgregarAutoPage implements OnInit {

  //#region Slides per view
  slidesCar = {
    slidesPerView: 3.5,
    spaceBetween: 2
  };

  slidesColor = {
    slidesPerView: 6.0
  };
  //#endregion

  @Output() avatarSel = new EventEmitter<string>();

  brands: Brand[] = [];
  colors: Color[] = [];
  carTypes: Car_type[] = [];
  cilindrajes: Cilindraje[] = [];
  user: Usuario = {};

  tempImages: string[] = [];

  public carSel: string;
  public colorSel: string;
  public cilindrajeSel: string;
  public brandSel: string;

  public carId: string;
  public cilindrajeId: string;
  public colorId: string;
  board: string;

  registerCar: Car = {
    board: '',
    picture: '/storage/cars/b40daba2f22937be7fc1b47899d8e382.jpg',
    car_type_id: '',
    cilindraje_id: '',
    brand_id: '',
    color_id: '',
    user_id: ''
  };

  URL = environment.url;

  constructor(
    private carService: CarService,
    private loadCtrl: LoadingController,
    private navCtrl: NavController,
    private userService: UserService,
    private camera: Camera) { }

  ngOnInit() {
    this.user = this.userService.getUsuario();
    this.loadData();
  }

  // #region metodos clic 
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

  selectedBrand(registerCar) {
    console.log(registerCar.brand_id)
  }
  // #endregion

  // #region Guardar carro
  async saveCar(registerCar) {
    registerCar.car_type_id = this.carId;
    registerCar.color_id = this.colorId;
    registerCar.cilindraje_id = this.cilindrajeId;
    registerCar.user_id = this.user.id.toString();

    console.log('data', this.registerCar);

    await this.carService.createCar(registerCar);
    this.navCtrl.navigateRoot('autos', { animated: true });
  }
  // #endregion

  // #region Cargar Marcas, Colores y Tipos 
  async loadData() {

    const loading = await this.loadCtrl.create({
      spinner: 'crescent'
    });
    loading.present();

    this.carService.getBrand().subscribe(resp => {
      this.brands.push(...resp['brands']);
      loading.dismiss();
      console.log('brands', this.brands);
    });
    this.carService.getColor().subscribe(resp => {
      this.colors.push(...resp['colors']);
      loading.dismiss();
      console.log('colors', this.colors);
    });
    this.carService.getCarType().subscribe(resp => {
      this.carTypes.push(...resp['carTypes']);
      loading.dismiss();
      console.log('types', this.carTypes);
    });
    this.carService.getCilindraje().subscribe(resp => {
      this.cilindrajes.push(...resp['cilindrajes']);
      loading.dismiss();
      console.log('cilindrajes', this.cilindrajes);
    });
  }
  // #endregion

  openCamera() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
      const img = window.Ionic.WebView.convertFileSrc(imageData);
      console.log(img)

      this.tempImages.push( img );
    }, (err) => {
      // Handle error
    });
  }
}
